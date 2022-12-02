

// ****LAUNCHPAD CODE *****
console.log(navigator);
    let device; 


if (navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success, failure)
}
function failure(){
    console.log('could not connect MIDI');
}
function updateDevices(event){
    console.log(event);
}



function success(midiAccess){
    console.log(midiAccess);
    midiAccess.addEventListener('statechange',updateDevices);
    let inputs =  midiAccess.inputs;

for (let output of midiAccess.outputs.values()){
   device = output;
   console.log('output device');
}

    inputs.forEach((input) => {
        console.log(input)
    input.addEventListener('midimessage', handleInput);
    });
}

function handleInput(input){
   
    let command = input.data[0];
    let note = input.data[1];
    let velcocity = input.data[2];
    console.log(`command: ${command}, note: ${note}, velcoity: ${velcocity}`);

    if (velcocity > 0){
        noteOn(note);
    }
    if (velcocity == 0){
        noteOff(note);
    }
}



function noteOn(note){
    console.log(`note:${note} // on`);
    if (note == 99){
        console.log("note on function ran")
        document.getElementById('Hello_tag').textContent = "goodbye!"
        colorM(note,99,10);
        colorM(note,98,20);
        colorM(note,97,30);
        colorM(note,96,40);
        colorM(note,96,50);
        colorM(note,94,60);
        colorM(note,93,70);
    }
}
function noteOff(note){
    console.log(`note:${note} // off`);
    if (note == 99){
        document.getElementById('Hello_tag').textContent = "Hello World!"
        colorM(note,99,0);
        colorM(note,98,0);
        colorM(note,97,0);
        colorM(note,96,0);
        colorM(note,96,0);
        colorM(note,94,0);
        colorM(note,93,0);
    }
}


function colorM(key,clr){
    device && device.send([0x90,key,clr]);// note on
}
