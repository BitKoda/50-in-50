sounds = ['applause', 'boo', 'fart', 'gasp', 'laugh', 'wrong'];

sounds.forEach(sound => {
  const btn = document.createElement('button');
  btn.classList.add('btn');

  btn.innerText = sound;

  btn.addEventListener('click', () => {
    stopSounds();

    document.getElementById(sound).play();
  });

  document.getElementById('buttons').appendChild(btn);
})

function stopSounds() {
  sounds.forEach(sound => {
    const audioClip = document.getElementById(sound);

    audioClip.pause();
    audioClip.currentTime = 0;
  })
}
