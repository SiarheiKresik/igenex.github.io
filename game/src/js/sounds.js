export default class SFX {
  constructor(options) {
    this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    this.source;
    this.src = options.src;
    this.gainNode = this.audioCtx.createGain();
    this.volume = options.volume;
    this.loop = options.loop;
    this.playStatus = false;
  }

  getData() {
    this.source = this.audioCtx.createBufferSource();

    fetch(this.src)
      .then(response => {
        return response.arrayBuffer();
      })
      .then(buffer => {
        this.audioCtx.decodeAudioData(buffer, decodedData => {
          this.source.buffer = decodedData;
          this.source.connect(this.gainNode);
          this.gainNode.connect(this.audioCtx.destination);
        });
      });
  };

  // wire up buttons to stop and play audio
  play() {
    this.getData();
    this.source.loop = this.loop;
    this.setVolume(this.volume);
    this.playStatus = true;
    this.source.start(0);
  }

  setVolume(value) {
    this.gainNode.gain.setValueAtTime(value, this.audioCtx.currentTime);
  }

  stop() {
    this.playStatus = false;
    this.source.stop(0);
  }

  mute() {
    this.gainNode.gain.setValueAtTime(1, this.audioCtx.currentTime);
  }

  unmute() {
    this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
  }
}