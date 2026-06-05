'use client'

import { Anchor, H1, Paragraph, XStack, YStack, ScrollView, Card, H2, H3, H4, useFadeIn } from '@my/ui'
import { ArrowLeft } from '@tamagui/lucide-icons'

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

export function SkjsonJsScreen() {
  return (
    <ScrollView flex={1} bg="$background">
      <YStack maxWidth={1200} w="100%" mx="auto" p="$6" gap="$8">
        <XStack items="center" gap="$2">
          <Anchor href="/" color="$color10" hoverStyle={{ color: '$color12' }} textDecorationLine="none">
            <XStack items="center" gap="$2">
              <ArrowLeft size={16} />
              <Paragraph>Back to Home</Paragraph>
            </XStack>
          </Anchor>
        </XStack>

        <FadeSection gap="$4">
          <H1 color="$color12" fontWeight="900">skjson-js Inference Runner</H1>
          <Paragraph size="$6" color="$color11">
            Zero dependencies. 100% mathematical parity. Run your JSON models natively in any JS environment.
          </Paragraph>
        </FadeSection>

        <FadeSection gap="$6">
          <H2>Installation</H2>
          <Card elevation="$4" borderWidth={1} borderColor="$borderColor" p="$4" bg="$color1">
            <Paragraph fontFamily="monospace" size="$3" color="$color11">
              npm install skjson-js
            </Paragraph>
          </Card>
        </FadeSection>

        <FadeSection gap="$6">
          <H2>Capabilities</H2>
          <XStack flexWrap="wrap" gap="$4">
            <Card elevation="$4" borderWidth={1} borderColor="$borderColor" hoverStyle={{ scale: 1.02 }} w={300} p="$4" gap="$2">
              <H3 size="$5" fontWeight="700">Universal</H3>
              <Paragraph color="$color11">Works in React, Vue, Vanilla JS, Node.js, and edge environments.</Paragraph>
            </Card>
            <Card elevation="$4" borderWidth={1} borderColor="$borderColor" hoverStyle={{ scale: 1.02 }} w={300} p="$4" gap="$2">
              <H3 size="$5" fontWeight="700">Type-Safe</H3>
              <Paragraph color="$color11">Written in TypeScript, providing full autocomplete for `.predict()` and `.predict_proba()`.</Paragraph>
            </Card>
          </XStack>
        </FadeSection>

        <FadeSection gap="$6">
          <H2>Inference Example</H2>
          <Card elevation="$4" borderWidth={1} borderColor="$borderColor" p="$4" bg="$color1">
            <Paragraph fontFamily="monospace" size="$3" color="$color11">
              import {'{'} loadModel {'}'} from 'skjson-js'{'\n\n'}
              // Fetch your JSON file{'\n'}
              const response = await fetch('model.json'){'\n'}
              const modelData = await response.json(){'\n\n'}
              const predictor = loadModel(modelData){'\n\n'}
              // Predict requires a 2D array: [[feature1, feature2, ...]]{'\n'}
              const preds = predictor.predict([[5.1, 3.5, 1.4, 0.2]]){'\n'}
              console.log(preds) // Output: [0]
            </Paragraph>
          </Card>
        </FadeSection>

        <FadeSection gap="$6" pb="$10">
          <H2>Preprocessing Execution</H2>
          <Paragraph color="$color11">
            If you exported a preprocessing model like `StandardScaler`, you can use the `.transform()` method natively:
          </Paragraph>
          <Card elevation="$4" borderWidth={1} borderColor="$borderColor" p="$4" bg="$color1">
            <Paragraph fontFamily="monospace" size="$3" color="$color11">
              const scaler = loadModel(scalerData){'\n'}
              const scaledFeatures = scaler.transform([[5.1, 3.5, 1.4, 0.2]]){'\n'}
              console.log(scaledFeatures)
            </Paragraph>
          </Card>
        </FadeSection>
      </YStack>
    </ScrollView>
  )
}
