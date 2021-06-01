import { useState, useRef } from 'react'
import { INSTRUMENT_SHORT_NAMES } from '../constants'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Slider from './Slider'

const ZTraversalExample = ({ minSigma, maxSigma, instrument, zDim }) => {
  const [sigma, setSigma] = useState(0)
  const audioRef = useRef()

  const instrumentShort = INSTRUMENT_SHORT_NAMES[instrument]
  const filenameNoExt = `/z_traversal_samples/${instrumentShort}_${sigma}sigma_z${zDim}`
  const updateAudioPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
      audioRef.current.play()
    }
  }

  const updateTraversalSigma = (e) => {
    setSigma(parseFloat(e.target.value))
    updateAudioPlayback()
  }
  return (
    <div className={styles.colcontainer}>
      <p>Instrument <b>{instrument}</b>, varying along z<sub>t</sub> dimension <b>{zDim}</b></p>
      <Image src={`${filenameNoExt}.png`} alt="Spectrogram of audio" width={250} height={162} />
      <audio controls ref={audioRef}>
        <source src={`${filenameNoExt}.wav`} type="audio/wav" />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Slider
        min={minSigma}
        max={maxSigma}
        step={1}
        value={sigma}
        onChange={updateTraversalSigma}
      />
    </div>
  )
}

const ZTraversalDemo = () => {
  return (
    <div
      className={styles.colcontainer}
      style={{ backgroundColor: '#ffafcc', borderRadius: '30px', 'padding': '2em', 'marginTop': '2em' }}>
      <h2>Latent Space Traversal</h2>
      <ZTraversalExample
        minSigma={-4}
        maxSigma={4}
        instrument={'Piano'}
        zDim={1}
      />
      <ZTraversalExample
        minSigma={-10}
        maxSigma={10}
        instrument={'Saxophone'}
        zDim={1}
      />
    </div>
  )
}

export default ZTraversalDemo
