char input;
boolean check = false;
static char endMarker = '\n';
const byte DATA_MAX_SIZE = 32;
char data[DATA_MAX_SIZE]; 


void setup(){
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  
  
}

void loop(){
  
  //Serial.println("hello from arduino");
  //delay(1000);

  memset(data, 32, sizeof(data));
  
//while(Serial.available() > 0) {
//      Serial.print("from incoming: ");
      input = Serial.read();
//
//
//      if (input == endMarker) {
//
          if (input == '1')  {
            Serial.println("got it");
            check = true;
          }
          if (input == '0')  {
            Serial.println("got it");
            check = false;
          }
//
//          
//        }
//        
//      
//      Serial.println(input);
//      delay(1000);
//}


    
//   Serial.println("got it");
//   check = true;
   
   if (check) {
      Serial.println( "serial received" );
      digitalWrite(13, HIGH);
      delay(1000);
      
    } 
   else {
      Serial.println( "serial not received" );
      digitalWrite(13, LOW);
      delay(1000);
    }
    
}
