const sounds = [
    {
        key: 'Q',
        audio: './audio/bonang_gamelan_hit_soft.mp3',
    },
    {
        key: 'W',
        audio: './audio/gong_gamelan_hit_soft.mp3',
    },
    {
        key: 'E',
        audio: './audio/gong_small_gamelan_hit_soft.mp3',
    },
    {
        key: 'A',
        audio: './audio/drum_tom_plastic.mp3',
    },
    {
        key: 'S',
        audio: './audio/cymbal_crash_tap.mp3',
    },
    {
        key: 'D',
        audio: './audio/waterphone_hit_condenser.mp3',
    },
    {
        key: 'Z',
        audio: './audio/toy_drum_hit.mp3',
    },
    {
        key: 'X',
        audio: './audio/plastic_hit_single_strike.mp3',
    },
    {
        key: 'C',
        audio: './audio/open_hi_hat.mp3'
    }
    // “Sound effects obtained from https://www.zapsplat.com “
]

function App() {
    const [volume, setVolume] = React.useState(1);
    const [speed, setSpeed] = React.useState(0.5);
    const [record, setRecord] = React.useState('');

    const playRecord = () => {
        let recordings = record.split(' ');
        let index = 0;

        const interval = setInterval(() => {
            let audio = document.getElementById(recordings[index]);
            audio.volume = volume;
            audio.currentTime = 0;
            audio.play();
            index++;
        }, 600 * speed);
        setTimeout(() => clearInterval(interval), 600 * speed * recordings.length - 1);
    }

    return (
        <div id="drum-machine" className="text-center text-info">
            <h3 className="text-white text-center py-3">Drum Machine 3 By Demo</h3>
            <div className="card mx-5 mb-5">
                <h5 className="font-weight-bold card-header text-uppercase" id="display">
                    Click on any Button or Press to any appropriate Key on your Keyboard to play
                </h5>
                <div className="card-body">
                    {sounds.map((sound, idx) =>
                        <Drum key={idx} sound={sound} volume={volume} setRecord={setRecord} />
                    )}
                </div>
                <div className="card-footer">
                    <h6 className="font-weight-bold">{record}</h6>
                    <div className="rages d-flex justify-content-center align-items-center my-3">
                        <h6 className="mt-2 mr-3 text-uppercase">Volume</h6>
                        <input
                            type="range"
                            step="0.01"
                            min="0"
                            max="1"
                            value={volume}
                            onChange={e => setVolume(e.target.value)}
                            className="w-25 mr-4"
                        />
                        <h6 className="mt-2 mr-3 ml-4 text-uppercase">Speed</h6>
                        <input
                            type="range"
                            step="0.01"
                            min="0.1"
                            max="1.5"
                            value={speed}
                            onChange={e => setSpeed(e.target.value)}
                            className="w-25"
                        />
                    </div>
                    {record &&
                        <>
                            <div className="btn btn-success mx-2" onClick={playRecord}>Play</div>
                            <div className="btn btn-danger mx-2" onClick={() => setRecord('')}>Clear</div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

function Drum({ sound, volume, setRecord }) {
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('keydown', keyHandler)
        };
    }, [])

    const keyHandler = (e) => {
        if (e.key.toUpperCase() == sound.key) {
            playSound();
        }
    }

    const playSound = () => {
        let audio = document.getElementById(sound.key);
        let display = document.getElementById('display');
        display.innerText = sound.key;
        setActive(true);
        setTimeout(() => setActive(false), 300);
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play();
        setRecord(prev => prev + sound.key + ' ');
    }

    return (
        <div className={`btn btn-info p-4 m-3 font-weight-bold drum-pad ${active && 'btn-warning text-info'}`} id={`drum-${sound.key}`} onClick={playSound}>
            <audio src={sound.audio} id={sound.key} className="clip"></audio>
            {sound.key}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));