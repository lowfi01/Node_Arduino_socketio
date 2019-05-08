int Temp = 1;
float val;
const byte DATA_MAX_SIZE = 32;
char data[DATA_MAX_SIZE]; 
String msg;
String readString;
String temp;
float setTemp;
boolean turnOn;
float f;


char floatbuf[32]; // make this at least big enough for the whole string



void setup() {
  Serial.begin(9600);
  pinMode(7, OUTPUT); // this is for triggering relay
  digitalWrite(7, HIGH); // turn fan into an off state
  setTemp = 30; // default temp
  turnOn = false;
  f = 0.00;
}

void loop() {     
  

  memset(data, 32, sizeof(data));

  // Read serial inputs 
  if (Serial.available()) {
    char c = Serial.read();  //gets one byte from serial buffer
    if (c == ',') {
      //Serial.println(readString); //prints string to serial port out
      msg = readString; // lets store the string :)
      temp = readString;  // store string for converting to float
      // convert serial input to float
      readString=""; //clears variable for new input      
     }  
    else {     
      readString += c; //makes the string readString
    }
  }


  
  // if Message Sent by Website is = "turn on fan";
  if (msg == "turn on fan" ) {
      turnOn = true;
    }

  // Parse the string input & convert to float
  temp.toCharArray(floatbuf, sizeof(floatbuf));
  f = atof(floatbuf);

  // Set the trigger for temp
  if (f > 10 ) { 
    setTemp = f; 
  }

    
  // Fan Algorithm is now running  
  if(turnOn){
          
          //
          //  * Note *
          //  * Expect a 2 seconds delay
          //  * before the fan will turn off & on
          //
          

          

        
         val = analogRead(A0); // lets read the output from temp sensor
         float voltage =  (val/1024.0)*500;
         float cel = (voltage);
               
      ///Serial.print("Current Temp: ");
         Serial.print(cel);
         Serial.println();
         
         // Turn fan based of set temp 
          if (cel > setTemp) {
            digitalWrite(7, LOW); // turn on fan
          } 
          else if (cel < setTemp){
            digitalWrite(7, HIGH); // turn off an
          }
          else {
             digitalWrite(7, HIGH); // turn off an
          }
          
          delay(1000); // stop fan from jerking
          
    }

   
  
     
   
      
   

}
