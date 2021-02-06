bool cache[10];
int increment=0;
bool sw = false;
int alert=0;
bool kill=false;
long output=1;
int poweron=0;

void setup() {
Serial.begin(9600);
pinMode(2,INPUT);
pinMode(5,INPUT);
pinMode(8,OUTPUT);
pinMode(7,OUTPUT);
}

void input(int i){
  output = output*10+i;
  }
int type(bool cache[]){
  int i=0;
  for(int j=0;j<10;j++){
    if(cache[j]==1)
    i++;
  }
if(i==0)
return 0;
else if(i<5)
return 1;
else return 2;
}

void loop() {
      if(alert==2){
    Serial.println(output);
    kill = true;
    alert++;
    }
if(!kill){
  if(digitalRead(2)){
      poweron++;
      delay(50);
    }
 //se bo užgalo ku držiš tipko (ko sw gre na true zčne use skup)
 if(poweron>10){
  digitalWrite(7,HIGH);
  sw = true;
  delay(10000);
  poweron=0;
  }
  
  if(sw){
        digitalWrite(8,HIGH);
        cache[increment] = digitalRead(5);
        delay(100);
        increment++;
        
        if(increment == 9){
          digitalWrite(8,LOW);
          int res = type(cache);
          switch(res){
            case 0:alert++;break;
            case 1:input(0);break;
            case 2:input(1);break;
            }
            increment=0;
            delay(1000);
        } 
    }
}
}
