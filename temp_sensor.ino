int Temp = 1;
float val;

void setup() {
  Serial.begin(9600);
  pinMode(7, OUTPUT);
  digitalWrite(7, HIGH);
   
}

void loop() {     


   
   val = analogRead(A0);
   float voltage =  (val/1024.0)*500;
   float cel = (voltage);
   
   

   Serial.print("Current Temp: ");
   Serial.print(cel);
   Serial.println();
   
   
   if (cel > 27 ) {
      digitalWrite(7, LOW);
    } else {
      digitalWrite(7, HIGH);
      }

      delay(1000);
     
      
   

}
