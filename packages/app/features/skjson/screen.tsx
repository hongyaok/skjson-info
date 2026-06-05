'use client'

import { Anchor, H1, Paragraph, XStack, YStack, ScrollView, Card, H2, H3, H4, useFadeIn } from '@my/ui'
import { ArrowLeft, Code } from '@tamagui/lucide-icons'

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

export function SkjsonScreen() {
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
          <H1 color="$color12" fontWeight="900">skjson Python Exporter</H1>
          <Paragraph size="$6" color="$color11">
            A pure Python tool to export scikit-learn models to standard JSON. Compatible with Joblib and ONNX natively.
          </Paragraph>
        </FadeSection>

        <FadeSection gap="$6">
          <H2>Installation</H2>
          <Card elevation="$4" borderWidth={1} borderColor="$borderColor" p="$4" bg="$color1">
            <Paragraph fontFamily="monospace" size="$3" color="$color11">
              pip install skjson
            </Paragraph>
          </Card>
        </FadeSection>

        <FadeSection gap="$6">
          <H2>Features & API</H2>
          <XStack flexWrap="wrap" gap="$4">
            <Card elevation="$4" borderWidth={1} borderColor="$borderColor" hoverStyle={{ scale: 1.02 }} w={300} p="$4" gap="$2">
              <H3 size="$5" fontWeight="700">Native Export</H3>
              <Paragraph color="$color11">Export directly from `model.fit()` using `skjson.save(model, 'model.json')`.</Paragraph>
            </Card>
            <Card elevation="$4" borderWidth={1} borderColor="$borderColor" hoverStyle={{ scale: 1.02 }} w={300} p="$4" gap="$2">
              <H3 size="$5" fontWeight="700">Joblib / ONNX Conversion</H3>
              <Paragraph color="$color11">Already saved your model? Convert from .joblib or .onnx directly to JSON without retraining.</Paragraph>
            </Card>
          </XStack>
        </FadeSection>

        <FadeSection gap="$6" pb="$10">
          <H2>Supported Scikit-Learn Models</H2>
          <Paragraph color="$color11">skjson natively exports the following models without additional configuration:</Paragraph>
          <XStack flexWrap="wrap" gap="$4">
            <Card elevation="$4" borderWidth={1} borderColor="$borderColor" w={250} p="$4">
              <H4>Ensembles</H4>
              <Paragraph color="$color11" size="$3">• RandomForestClassifier{'\n'}• RandomForestRegressor{'\n'}• GradientBoostingClassifier</Paragraph>
            </Card>
            <Card elevation="$4" borderWidth={1} borderColor="$borderColor" w={250} p="$4">
              <H4>Linear Models</H4>
              <Paragraph color="$color11" size="$3">• LogisticRegression{'\n'}• LinearRegression{'\n'}• Ridge / Lasso</Paragraph>
            </Card>
            <Card elevation="$4" borderWidth={1} borderColor="$borderColor" w={250} p="$4">
              <H4>Preprocessing</H4>
              <Paragraph color="$color11" size="$3">• StandardScaler{'\n'}• MinMaxScaler{'\n'}• OneHotEncoder</Paragraph>
            </Card>
          </XStack>
        </FadeSection>
      </YStack>
    </ScrollView>
  )
}
