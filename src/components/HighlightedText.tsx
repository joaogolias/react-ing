import React, { useState } from 'react';

function HightlightedText() {
  const [highlighted, setHighlighted] = useState([
    "começar a escrever um texto grande",
    "um texto para ver"
  ]);

  const [tempHighlighted, setTempHighlighted] = useState("")

  const text: string = "Esse é um texto para ver se conseguimos marcar o texto. Para isso, vou tentar começar a escrever um texto grande, memso que sem sentido que tenha acentos e tudo mais do português."

  const sortHighlighted = highlighted
    .filter((textToMark) =>
      text?.toLocaleLowerCase()?.indexOf(textToMark.toLocaleLowerCase().trim()) !== -1
    )
    .sort((a, b) => 
      text?.toLocaleLowerCase()?.indexOf(a.toLocaleLowerCase().trim()) > text?.toLocaleLowerCase()?.indexOf(b.toLocaleLowerCase().trim()) ? 1 : -1 
  )

  console.log("sortHighlighted: ", sortHighlighted);

  let textToPartition = text;
  console.log("textToPartition: ", textToPartition);
  const textParts = sortHighlighted.reduce((acc, curr, i, arr) => {
    console.log("textToPartition: ", textToPartition);
    if (textToPartition) {
      const splitText = textToPartition.split(curr);
      acc.push({ text: splitText[0], shouldHightlight: false })
      acc.push({ text: curr, shouldHightlight: true })
      textToPartition = splitText[1]
      if (i === arr.length - 1) {
        acc.push({ text: textToPartition, shouldHightlight: false })
      }
      return acc;
    }
    return acc;
  }, [] as {text: string, shouldHightlight: boolean}[])

  console.log("textParts: ", textParts);
  const onMouseUp = (e: any) => {
    if (window.getSelection()?.toString()) {
      setHighlighted([...highlighted, window.getSelection()!.toString()])
    }
  }

  const onMouseDown = (e: any) => {
  }

  console.log("TEMP HIGHLIGHTED: ", tempHighlighted)
  return (
    <div onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
      {
        textParts.map((part) => {
          if (part.shouldHightlight) {
            return (
            <mark>{part.text}</mark>)
          }
          return <span>{part.text}</span> 
        })
      }
          
    </div>
  );
}

export default HightlightedText;
