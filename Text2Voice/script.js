function initializeVoice() {
    const voiceSelect = document.getElementById('voiceSelect');
    const synth = window.speechSynthesis;

    // Fetch the available voices and populate the select dropdown
    synth.addEventListener('voiceschanged', () => {
        const voices = synth.getVoices();

        voices.forEach((voice) => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    });
}

// Call initializeVoice function on page load
initializeVoice();

// Update convertToSpeech function to use the selected voice
function convertToSpeech() {
    const inputText = document.getElementById('inputText').value;
    const audioPlayer = document.getElementById('audioPlayer');
    const voiceSelect = document.getElementById('voiceSelect');
    
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(inputText);

    // Set the selected voice
    const selectedVoice = voiceSelect.value;
    const voices = synth.getVoices();
    const voice = voices.find(v => v.name === selectedVoice);
    utterance.voice = voice;

    synth.cancel(); // Stop any previous speech
    synth.speak(utterance);
        // Update the audio player source
    const blob = new Blob([new Uint8Array(0)]);
    const objectUrl = URL.createObjectURL(blob);
    audioPlayer.src = objectUrl;

}

