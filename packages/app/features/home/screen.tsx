'use client'

import {
  Anchor,
  Button,
  H1,
  H2,
  H3,
  H4,
  Paragraph,
  Separator,
  SwitchThemeButton,
  XStack,
  YStack,
  Card,
  ScrollView,
  Theme,
  SizableText,
  useFadeIn,
} from '@my/ui'
import { CheckCircle, Code, Copy, Cpu, Globe, ArrowRight, Activity, Zap, ServerOff, SearchCode } from '@tamagui/lucide-icons'
import { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { loadModel } from 'skjson-js'
import { Input, Label } from '@my/ui'

function FadeSection({ children, ...props }: any) {
  const { ref, isVisible } = useFadeIn()
  return (
    <YStack
      ref={ref}
      animation="lazy"
      opacity={isVisible ? 1 : 0}
      y={isVisible ? 0 : 20}
      w="100%"
      {...props}
    >
      {children}
    </YStack>
  )
}

export function HomeScreen() {
  const [shakeOffset, setShakeOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Start shaking slightly after the drop animation completes
    const timer = setTimeout(() => {
      let count = 0
      const interval = setInterval(() => {
        setShakeOffset({ x: Math.random() * 20 - 10, y: Math.random() * 20 - 10 })
        count++
        if (count > 10) {
          clearInterval(interval)
          setShakeOffset({ x: 0, y: 0 })
        }
      }, 40)
    }, 600) // Match the drop animation timing
    return () => clearTimeout(timer)
  }, [])

  return (
    <ScrollView flex={1} bg="$background">
      <YStack flex={1} items="center" w="100%">
        {/* Header / Nav */}
        <XStack
          w="100%"
          px="$6"
          py="$4"
          position="absolute"
          t={0}
          l={0}
          r={0}
          justify="space-between"
          items="center"
          zIndex={100}
        >
          <H3 fontWeight="900" color="$color12" letterSpacing={-1}>skjson</H3>
          <XStack gap="$4" items="center">
            <Button
              asChild
              bg="rgba(150, 150, 150, 0.1)"
              borderWidth={1}
              borderColor="rgba(150, 150, 150, 0.2)"
              hoverStyle={{ bg: 'rgba(150, 150, 150, 0.2)' }}
              borderRadius="$10"
              size="$3"
            >
              <Anchor href="/skjson" color="$color12" textDecorationLine="none">Python Exporter</Anchor>
            </Button>
            <Button
              asChild
              bg="rgba(150, 150, 150, 0.1)"
              borderWidth={1}
              borderColor="rgba(150, 150, 150, 0.2)"
              hoverStyle={{ bg: 'rgba(150, 150, 150, 0.2)' }}
              borderRadius="$10"
              size="$3"
            >
              <Anchor href="/skjson-js" color="$color12" textDecorationLine="none">JS Runner</Anchor>
            </Button>
            {Platform.OS === 'web' && <SwitchThemeButton />}
          </XStack>
        </XStack>

        <YStack
          maxWidth={1200}
          w="100%"
          px="$4"
          pt="$14"
          pb="$10"
          gap="$10"
          $sm={{ pt: '$12', gap: '$8' }}
          x={shakeOffset.x}
          y={shakeOffset.y}
        >
          {/* 1. Hero Section */}
          <FadeSection mt="$8" items="center" gap="$6">
            <H1
              size="$13"
              $sm={{ size: '$11' }}
              fontWeight="900"
              color="$color12"
              letterSpacing={-4}
              textAlign="center"
              animation="bouncy"
              y={0}
              opacity={1}
              scale={1}
              enterStyle={{
                y: -100,
                opacity: 0,
                scale: 1.2,
              }}
              style={Platform.OS === 'web' ? { textShadow: '0px 20px 30px rgba(0,0,0,0.5)' } : undefined}
            >
              skjson
            </H1>

            <YStack items="center" mt="$4">
              <H1
                size="$10"
                $sm={{ size: '$8' }}
                fontWeight="900"
                color="$color12"
                letterSpacing={-2}
                lineHeight={1.1}
                textAlign="center"
              >
                Train in Python.<br />
                <SizableText size="$10" $sm={{ size: '$8' }} color="$blue10" fontWeight="900">Run in the browser.</SizableText><br />
                No backend needed.
              </H1>
            </YStack>
            <Paragraph size="$6" color="$color11" maxWidth={600} textAlign="center" mt="$4">
              Your sklearn model belongs in the frontend. Skip the Flask API, CORS headers, and deployment pipelines. Export to JSON, load in JS, and predict instantly at the edge.
            </Paragraph>
            <XStack gap="$4" mt="$4" flexWrap="wrap" justify="center">
              <Button size="$5" bg="$blue10" color="white" hoverStyle={{ bg: '$blue11' }} icon={Copy} onPress={() => {}}>
                pip install skjson
              </Button>
              <Button size="$5" variant="outlined" icon={Copy} onPress={() => {}}>
                npm install skjson-js
              </Button>
            </XStack>
          </FadeSection>

          {/* 2. The Problem */}
          <FadeSection bg="$color3" p="$8" borderRadius="$8" gap="$4" mt="$8" items="center">
            <ServerOff size={48} color="$red10" />
            <H2 size="$8" fontWeight="800" textAlign="center">You built a great model. Now what?</H2>
            <Paragraph size="$5" color="$color11" textAlign="center" maxWidth={800}>
              "Now you need a Flask API, a server, CORS headers, rate limiting, deployment pipelines... just to run predictions on a form field." This resonates immediately with anyone who's been there.
            </Paragraph>
          </FadeSection>

          {/* 3. How It Works - 3 Step Visual */}
          <FadeSection gap="$6" mt="$10">
            <H2 size="$8" fontWeight="800" textAlign="center">From fit() to frontend in 3 steps</H2>
            <XStack flexWrap="wrap" gap="$4" justify="center">
              <Card elevation="$4" borderWidth={1} borderColor="$borderColor" hoverStyle={{ scale: 1.02 }} w={300} animation="bouncy">
                <Card.Header p="$4" gap="$3">
                  <H3 size="$6" fontWeight="700">1. 🏋️ Train</H3>
                  <Paragraph color="$color11">Train your scikit-learn model in Python as normal.</Paragraph>
                </Card.Header>
              </Card>
              <Card elevation="$4" borderWidth={1} borderColor="$borderColor" hoverStyle={{ scale: 1.02 }} w={300} animation="bouncy">
                <Card.Header p="$4" gap="$3">
                  <H3 size="$6" fontWeight="700">2. 📦 Export</H3>
                  <Paragraph color="$color11">skjson.save(model, "model.json")</Paragraph>
                </Card.Header>
              </Card>
              <Card elevation="$4" borderWidth={1} borderColor="$borderColor" hoverStyle={{ scale: 1.02 }} w={300} animation="bouncy">
                <Card.Header p="$4" gap="$3">
                  <H3 size="$6" fontWeight="700">3. 🌐 Run</H3>
                  <Paragraph color="$color11">Load it in JS, call .predict() in the browser.</Paragraph>
                </Card.Header>
              </Card>
            </XStack>
          </FadeSection>

          {/* 4. Live Interactive Demo */}
          <FadeSection mt="$10" p="$8" borderRadius="$8" bg="$color2" borderWidth={1} borderColor="$borderColor" gap="$6" items="center">
            <H2 size="$8" fontWeight="800">Live Interactive Demo</H2>
            <Paragraph color="$color11" textAlign="center">
              Try it right now. This form runs predictions purely on your device using `skjson-js`. Zero network requests.
            </Paragraph>
            <DemoWidget />
          </FadeSection>

          {/* 5. Code Snippets Side-by-Side */}
          <FadeSection mt="$10" gap="$6">
            <H2 size="$8" fontWeight="800" textAlign="center">Code so clean you could cry</H2>
            <XStack flexWrap="wrap" gap="$4" justify="center">
              <Card elevation="$4" borderWidth={1} borderColor="$borderColor" flex={1} minWidth={300} bg="$color1">
                <Card.Header p="$4">
                  <XStack items="center" gap="$2" mb="$2"><Code size={16} color="$blue10"/><H4>Python</H4></XStack>
                  <Paragraph fontFamily="monospace" size="$3" color="$color11">
                    from sklearn.ensemble import RandomForestClassifier{'\n'}
                    import skjson{'\n\n'}
                    clf = RandomForestClassifier().fit(X, y){'\n'}
                    skjson.save(clf, 'model.json')
                  </Paragraph>
                </Card.Header>
              </Card>
              <Card elevation="$4" borderWidth={1} borderColor="$borderColor" flex={1} minWidth={300} bg="$color1">
                <Card.Header p="$4">
                  <XStack items="center" gap="$2" mb="$2"><Code size={16} color="$yellow10"/><H4>JavaScript</H4></XStack>
                  <Paragraph fontFamily="monospace" size="$3" color="$color11">
                    import {'{'} loadModel {'}'} from 'skjson-js'{'\n'}
                    import modelJson from './model.json'{'\n\n'}
                    const predictor = loadModel(modelJson){'\n'}
                    const preds = predictor.predict(new_data)
                  </Paragraph>
                </Card.Header>
              </Card>
            </XStack>
          </FadeSection>

          {/* 6. Why skjson? */}
          <FadeSection mt="$10" gap="$6">
            <H2 size="$8" fontWeight="800" textAlign="center">Why skjson?</H2>
            <XStack flexWrap="wrap" gap="$4" justify="center">
              <FeatureCard icon={ServerOff} title="No Backend" desc="No API, no server costs. Run models directly on the client." />
              <FeatureCard icon={Zap} title="Instant Inference" desc="Zero network round-trip latency. Predictions happen in milliseconds." />
              <FeatureCard icon={CheckCircle} title="Safe & Secure" desc="JSON can't execute arbitrary code like Pickle can." />
              <FeatureCard icon={Globe} title="Works Anywhere" desc="React, Vue, Node, Edge functions—any JS environment." />
              <FeatureCard icon={SearchCode} title="Inspectable" desc="Open the JSON and see exactly what your model learned." />
            </XStack>
          </FadeSection>

          {/* 7. Use Cases */}
          <FadeSection mt="$10" gap="$6">
            <H2 size="$8" fontWeight="800" textAlign="center">Real Use Cases</H2>
            <XStack flexWrap="wrap" gap="$4" justify="center">
              <Card elevation="$4" borderWidth={1} borderColor="$borderColor" hoverStyle={{ scale: 1.02 }} w={250} animation="bouncy">
                <Card.Header p="$4" gap="$2">
                  <Activity color="$blue10" />
                  <H4>Churn Prediction</H4>
                  <Paragraph size="$3" color="$color11">Widget in a React dashboard</Paragraph>
                </Card.Header>
              </Card>
              <Card elevation="$4" borderWidth={1} borderColor="$borderColor" hoverStyle={{ scale: 1.02 }} w={250} animation="bouncy">
                <Card.Header p="$4" gap="$2">
                  <Activity color="$blue10" />
                  <H4>Lead Scoring</H4>
                  <Paragraph size="$3" color="$color11">Instant qualification on marketing pages</Paragraph>
                </Card.Header>
              </Card>
              <Card elevation="$4" borderWidth={1} borderColor="$borderColor" hoverStyle={{ scale: 1.02 }} w={250} animation="bouncy">
                <Card.Header p="$4" gap="$2">
                  <Activity color="$blue10" />
                  <H4>Risk Classification</H4>
                  <Paragraph size="$3" color="$color11">Real-time frontend fintech checks</Paragraph>
                </Card.Header>
              </Card>
            </XStack>
          </FadeSection>

          {/* Footer */}
          <Separator mt="$10" />
          <XStack justify="space-between" py="$6" flexWrap="wrap" gap="$4">
            <Paragraph color="$color11">© 2026 skjson creators</Paragraph>
            <XStack gap="$4">
              <Anchor href="https://github.com/hongyaok/skjson" target="_blank" color="$color11">GitHub (Python)</Anchor>
              <Anchor href="https://github.com/hongyaok/skjson-js" target="_blank" color="$color11">GitHub (JS)</Anchor>
            </XStack>
          </XStack>

        </YStack>
      </YStack>
    </ScrollView>
  )
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <Card elevation="$4" borderWidth={1} borderColor="$borderColor" w={280} hoverStyle={{ scale: 1.02 }} animation="bouncy">
      <Card.Header p="$4" gap="$3">
        <Icon size={24} color="$color12" />
        <H3 size="$5" fontWeight="700">{title}</H3>
        <Paragraph color="$color11">{desc}</Paragraph>
      </Card.Header>
    </Card>
  )
}

function DemoWidget() {
  const [mounted, setMounted] = useState(false)
  const [model, setModel] = useState<any>(null)
  const [sepalLength, setSepalLength] = useState('5.1')
  const [sepalWidth, setSepalWidth] = useState('3.5')
  const [petalLength, setPetalLength] = useState('1.4')
  const [petalWidth, setPetalWidth] = useState('0.2')
  const [prediction, setPrediction] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load model.json from the public folder
    fetch('/model.json')
      .then(res => res.json())
      .then(json => {
        const predictor = loadModel(json)
        setModel(predictor)
      })
      .catch(console.error)
  }, [])

  const handlePredict = () => {
    if (!model) return
    setLoading(true)
    setTimeout(() => {
      try {
        const input = [[
          parseFloat(sepalLength),
          parseFloat(sepalWidth),
          parseFloat(petalLength),
          parseFloat(petalWidth)
        ]]
        const preds = model.predict(input)
        const classes = ['Setosa', 'Versicolor', 'Virginica']
        setPrediction(classes[preds[0]] || `Class ${preds[0]}`)
      } catch (err) {
        console.error(err)
        setPrediction('Error predicting')
      }
      setLoading(false)
    }, 50) // Artificial delay for UI feedback
  }

  return (
    <Card elevation="$4" borderWidth={1} borderColor="$borderColor" w="100%" maxWidth={600} bg="$color1">
      <Card.Header p="$4" gap="$4">
        <Paragraph color="$color11" textAlign="center" mb="$2">
          Try classifying an Iris flower (Random Forest model):
        </Paragraph>

        <XStack flexWrap="wrap" gap="$4" justify="center">
          <YStack gap="$2" w={120}>
            <Label htmlFor="sl">Sepal Length</Label>
            <Input id="sl" value={sepalLength} onChangeText={setSepalLength} keyboardType="numeric" />
          </YStack>
          <YStack gap="$2" w={120}>
            <Label htmlFor="sw">Sepal Width</Label>
            <Input id="sw" value={sepalWidth} onChangeText={setSepalWidth} keyboardType="numeric" />
          </YStack>
          <YStack gap="$2" w={120}>
            <Label htmlFor="pl">Petal Length</Label>
            <Input id="pl" value={petalLength} onChangeText={setPetalLength} keyboardType="numeric" />
          </YStack>
          <YStack gap="$2" w={120}>
            <Label htmlFor="pw">Petal Width</Label>
            <Input id="pw" value={petalWidth} onChangeText={setPetalWidth} keyboardType="numeric" />
          </YStack>
        </XStack>
      </Card.Header>

      <Card.Footer p="$4" justify="center">
        {mounted ? (
          <Button bg="$blue10" color="white" hoverStyle={{ bg: '$blue11' }} onPress={handlePredict} disabled={!model || loading} icon={loading ? Activity : Cpu}>
            {model ? (loading ? 'Predicting...' : 'Predict') : 'Loading Model...'}
          </Button>
        ) : (
          <Button bg="$blue10" color="white" disabled icon={Cpu}>
            Loading Model...
          </Button>
        )}
      </Card.Footer>

      {prediction && (
        <YStack p="$4" bg="$color3" borderBottomLeftRadius="$4" borderBottomRightRadius="$4" items="center" gap="$2">
          <Paragraph color="$color11">Predicted Class:</Paragraph>
          <H2 color="$blue10" fontWeight="800">{prediction}</H2>
        </YStack>
      )}
    </Card>
  )
}
