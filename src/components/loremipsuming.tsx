'use client'

import { useState } from 'react'
import { LoremIpsum } from 'lorem-ipsum'
import { Copy } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

type GenerateType = 'paragraphs' | 'sentences' | 'words' | 'lists' | 'bytes'

export default function LoremIpsuming() {
  const [count, setCount] = useState(1)
  const [generateType, setGenerateType] = useState<GenerateType>('paragraphs')
  const [generatedText, setGeneratedText] = useState('')
  const { toast } = useToast()

  const generateLoremIpsum = () => {
    let result = ''
    switch (generateType) {
      case 'paragraphs':
        result = lorem.generateParagraphs(count)
        break
      case 'sentences':
        result = lorem.generateSentences(count)
        break
      case 'words':
        result = lorem.generateWords(count)
        break
      case 'lists':
        result = Array.from({ length: count }, (_, i) => `${i + 1}. ${lorem.generateSentences(1)}`).join('\n')
        break
      case 'bytes':
        result = lorem.generateParagraphs(Math.ceil(count / 100)).slice(0, count)
        break
    }
    setGeneratedText(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText)
    toast({
      title: "Copied to clipboard",
      description: "The lorem ipsum text has been copied to your clipboard.",
    })
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>LoremIpsuming</CardTitle>
          <CardDescription>Generate Lorem Ipsum text in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); generateLoremIpsum(); }} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Label htmlFor="count" className="w-20">Count:</Label>
              <Input
                id="count"
                type="number"
                min="1"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-24"
              />
            </div>
            <RadioGroup value={generateType} onValueChange={(value) => setGenerateType(value as GenerateType)}>
              <div className="flex flex-wrap gap-4">
                {(['paragraphs', 'sentences', 'words', 'lists', 'bytes'] as const).map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            <Button type="submit">Generate</Button>
          </form>
          {generatedText && (
            <div className="mt-6 relative">
              <div className="bg-muted rounded-md p-4 max-h-96 overflow-y-auto">
                {generateType === 'lists' ? (
                  <ol className="list-decimal list-inside space-y-2">
                    {generatedText.split('\n').map((item, index) => (
                      <li key={index}>{item.substring(item.indexOf('.') + 2)}</li>
                    ))}
                  </ol>
                ) : (
                  generatedText.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

