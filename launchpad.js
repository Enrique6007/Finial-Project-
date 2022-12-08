// *** LAUNCHPAD CODE ***
console.log(navigator);
let device;

// This block of functions are manage connecting the web-midi-api to your launchpad
// they also parse the incoming and outgoing signals into meaningful numbers
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(success, failure);
}
function failure() {
  console.log("Could not connect MIDI");
}

function updateDevices(event) {
  console.log(event);
}

function success(midiAccess) {
//   console.log(midiAccess);
  midiAccess.addEventListener('statechange', updateDevices);
  let inputs = midiAccess.inputs;
//   console.log(inputs);

    for (let output of midiAccess.outputs.values()) {
        device = output;
        // console.log('Output device selected', device);
    }

  inputs.forEach((input) => {
    //   console.log(input);
      input.addEventListener('midimessage', handleInput);
  });
}

function handleInput(input) {
  // console.log(input);

  let command   = input.data[0];
  let note      = input.data[1];
  let velocity  = input.data[2];

  // console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`);


  if (velocity > 0) {
    noteOn(note);
  }

  if (velocity == 0){
    noteOff(note);
  }
}


// The proceding functions are where you will impliment your own 
// custom javascript functions on the notes of the launchpad
function noteOn(note) {
  console.log(`note:${note} // on`);

  if ( note == 99){
    document.getElementById('hello_tag').textContent = "GoodBye!"
    colorM(note,104);
    colorM(note+1,104);
    colorM(note+2,104);

  }

  if ( note == 64){
    document.getElementById('hello_tag').textContent = "64!"
    colorM(note,124);
    colorM(note+1,124);
    colorM(note+2,124);

  }
}

function noteOff(note){
    console.log(`note:${note} // off`);
    

    if ( note == 99){
        document.getElementById('hello_tag').textContent = "Hello World!"
        colorM(note,0);
        colorM(note+1,0);
        colorM(note+2,0);
      }

    if ( note == 64){
        document.getElementById('hello_tag').textContent = "Hello World!"
        colorM(note,0);
        colorM(note+1,0);
        colorM(note+2,0);
      }

}

// This function is used to change the color of the midi's LED's. 
// It is implemented in the noteOn and noteOff functions above
function colorM(key,clr){
  // The color key can be found on page 11 @ https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiEjtrOurb7AhXMlokEHcjqB_0QFnoECA8QAQ&url=https%3A%2F%2Fwww.djshop.gr%2FAttachment%2FDownloadFile%3FdownloadId%3D10737&usg=AOvVaw02Njpg1AY5jOV7Z6gjcw5W
    device && device.send([0x90,key,clr]); 
}

