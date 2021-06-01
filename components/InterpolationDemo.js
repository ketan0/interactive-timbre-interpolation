import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useRef, useEffect } from 'react'
import Dropdown from './Dropdown'
import Slider from './Slider'
import { INSTRUMENT_SHORT_NAMES } from '../constants'

const InterpolationDemo = () => {
  const [alpha, setAlpha] = useState(0)
  const alphaString = alpha.toFixed(1)

  const audioRef = useRef()

  const [sourceInstrument, setSourceInstrument] = useState('Piano')
  const [targetInstrument, setTargetInstrument] = useState('Cello')
  const instrumentNotes = {
    'Piano': ['B3', 'G6', 'F3', 'D3'],
    'Cello': ['B3', 'D5', 'F3'],
    'French horn': ['D5'],
    'Trumpet': ['D5', 'F3']
  }
  const notes = instrumentNotes[sourceInstrument]
  const [currentNote, setCurrentNote] = useState(notes[0])

  useEffect(() => {
    setCurrentNote(instrumentNotes[sourceInstrument][0])
    updateAudioPlayback()
  }, [sourceInstrument])

  const instruments = Object.keys(INSTRUMENT_SHORT_NAMES).filter(value => value !== 'Saxophone')
  const sourceInstrumentShort = INSTRUMENT_SHORT_NAMES[sourceInstrument]
  const targetInstrumentShort = INSTRUMENT_SHORT_NAMES[targetInstrument]
  const filenameNoExt = `/interpolation_samples/${sourceInstrumentShort}_${targetInstrumentShort}_${alphaString}_${currentNote}`

  const updateAudioPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
      audioRef.current.play()
    }
  }
  const updateInterpolationAlpha = (e) => {
    setAlpha(parseFloat(e.target.value))
    updateAudioPlayback()
  }
  const updateInterpolationSource = (e) => {
    setSourceInstrument(e.target.value)
    updateAudioPlayback()
  }
  const updateInterpolationTarget = (e) => {
    setTargetInstrument(e.target.value)
    updateAudioPlayback()
  }
  const updateInterpolationNote = (e) => {
    setCurrentNote(e.target.value)
    updateAudioPlayback()
  }

  return (
    <div className={styles.colcontainer} style={{ backgroundColor: '#bde0fe', borderRadius: '30px' }}>
      <h2>Timbre Interpolation</h2>
      <Dropdown
        label="Note: "
        values={notes}
        selectedValue={currentNote}
        changeHandler={updateInterpolationNote}
      />
      <div className={styles.rowcontainer}>
        <Dropdown
          label="Source instrument: "
          values={instruments}
          selectedValue={sourceInstrument}
          changeHandler={updateInterpolationSource}
        />
        <Image src={`${filenameNoExt}.png`} alt="Spectrogram of audio" width={250} height={162} />
        <Dropdown
          label="Target instrument: "
          values={instruments}
          selectedValue={targetInstrument}
          changeHandler={updateInterpolationTarget}
        />
      </div>
      <audio controls ref={audioRef}>
        <source src={`${filenameNoExt}.wav`} type="audio/wav" />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Slider
        min={0}
        max={1}
        step={0.1}
        value={alpha}
        onChange={updateInterpolationAlpha}
      />
      <p>{alpha.toFixed(1)}</p>
    </div>
  )
}

export default InterpolationDemo
