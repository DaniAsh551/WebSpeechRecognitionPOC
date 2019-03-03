
function init(){
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    if(!window.SpeechRecognition)
        alert("Speech Recognition is not supported on this browser. Please consider upgrading.");

    document.getElementById('record').addEventListener('click', function(e){
        console.log('record clicked.');
        let mode = document.getElementById('record').innerText;
        switch(mode)
        {
            case 'Record':
                start_recording(document.getElementById('language').value);
                document.getElementById('record').innerText = 'Stop';
            break;
            case 'Stop':
                start_pause();
                document.getElementById('record').innerText = 'Record';
            break;
        }
    });

    let countHander = function(e){
        let count = document.getElementById('wordCounter');
        let val = document.getElementById('result').value;
        let no = val === '' ? 0 : val.split(' ').length;
        count.innerText = no + ' Words.';
    };
    document.getElementById('result').addEventListener('keyup', countHander);
    document.getElementById('result').addEventListener('change', countHander);

    //The event handler which would handle the recognition result.
    window.recognitionHandler = function(speech, isFinal)
    {
        document.getElementById('recognition').innerText = speech;
        if(isFinal)
        {
            let shallConfirm = document.getElementById('confirm').checked;
            let isConfirmed = true;
            if(shallConfirm)
            {
                isConfirmed = this.confirm("Would you like to append to the result?")
            }

            document.getElementById('result').value += speech;
            document.getElementById('recognition').innerText = 'Recognized speech will appear here.';
            document.getElementById('record').innerText = 'Record';
        }
    };

    console.log('Init complete.');
}

function init_recognition(lang)
{
    window.recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.continous=true;
    recognition.lang = lang;

    return window.recognition;
}

function start_recording(lang)
{
    let original = lang;
    lang = lang.replace('_', '-').replace('UK','GB');
    if(!['en-GB','es-ES'].includes(lang))
        throw {error:'Invalid Language', message:`The language '${original}' is not valid. Please use either 'en_UK' or 'es_ES'.`};

    let recog = init_recognition(lang);
    recog.onresult = e => window.recognitionHandler(e.results[0][0].transcript, e.results[0].isFinal);
    window.recognition.start();
}

function start_pause()
{
    window.recognition.stop();
}

document.addEventListener("DOMContentLoaded", function(e){
    init();
});
