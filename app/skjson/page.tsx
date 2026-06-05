'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { LogoText } from '@/components/LogoText'
import { CodeBlock } from '@/components/CodeBlock'
import { Github } from '@/components/GithubIcon'

function FadeSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`w-full flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col normal-case">
      <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 py-12 gap-12">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        <FadeSection className="gap-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground"><LogoText text="{skjson}" /></h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            is a pure Python tool to export scikit-learn models to standard JSON. Compatible with Joblib and ONNX natively.
          </p>
          <div className="flex gap-4 mt-2 flex-wrap">
            <a href="https://github.com/hongyaok/skjson" target="_blank" rel="noreferrer" className="w-fit">
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" />
                skjson
              </Button>
            </a>
            <a href="https://pypi.org/project/skjson/" target="_blank" rel="noreferrer" className="w-fit">
              <Button variant="outline" className="gap-2">
                <Package className="w-4 h-4" />
                PyPI
              </Button>
            </a>
          </div>
        </FadeSection>

        <FadeSection className="gap-6">
          <h2 className="text-3xl font-extrabold">Installation</h2>
          <CodeBlock tabs={[{ label: 'Bash', language: 'bash', code: 'pip install skjson' }]} />
        </FadeSection>

        <FadeSection className="gap-6 mt-4">
          <h2 className="text-3xl font-extrabold">Quick Start</h2>
          <CodeBlock tabs={[
            {
              label: 'Python',
              language: 'python',
              code: `from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import skjson

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(random_state=42).fit(X_train, y_train)

# Export the trained model to JSON
skjson.save(clf, 'demo.json')`
            }
          ]} />
        </FadeSection>

        <FadeSection className="gap-6 mt-4">
          <h2 className="text-3xl font-extrabold">Convert from Existing Models</h2>
          <p className="text-muted-foreground">
            skjson supports converting sklearn models directly from joblib and ONNX formats without the need to load the model in Python first.
          </p>
          <CodeBlock tabs={[
            {
              label: 'Joblib',
              language: 'python',
              code: `import skjson

# Convert a joblib-serialized sklearn model to JSON
skjson.joblib_to_json("model.joblib")
# → Creates "model.json" in the same directory`
            },
            {
              label: 'ONNX',
              language: 'python',
              code: `import skjson

# Convert an ONNX model to JSON
skjson.onnx_to_json("model.onnx")
# → Creates "model.json" in the same directory`
            }
          ]} />
        </FadeSection>

        <FadeSection className="gap-6">
          <h2 className="text-3xl font-extrabold">Features & API</h2>
          <div className="flex flex-wrap gap-4">
            <Card className="w-80 transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl">Native Export</CardTitle>
                <p className="text-muted-foreground text-sm mt-2">Export directly from `model.fit()` using `skjson.save(model, 'model.json')`.</p>
              </CardHeader>
            </Card>
            <Card className="w-80 transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl">Joblib / ONNX Conversion</CardTitle>
                <p className="text-muted-foreground text-sm mt-2">Already saved your model? Convert from .joblib or .onnx directly to JSON without retraining.</p>
              </CardHeader>
            </Card>
          </div>
        </FadeSection>

        <FadeSection className="gap-6 pb-12">
          <h2 className="text-3xl font-extrabold">Supported Scikit-Learn Models</h2>
          <p className="text-muted-foreground">skjson natively exports the following models without additional configuration:</p>
          <div className="flex flex-wrap gap-4">
            <Card className="w-64">
              <CardHeader>
                <h4 className="font-semibold mb-2">Ensembles</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• RandomForestClassifier</li>
                  <li>• RandomForestRegressor</li>
                  <li>• GradientBoostingClassifier</li>
                </ul>
              </CardHeader>
            </Card>
            <Card className="w-64">
              <CardHeader>
                <h4 className="font-semibold mb-2">Linear Models</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• LogisticRegression</li>
                  <li>• LinearRegression</li>
                  <li>• Ridge / Lasso</li>
                </ul>
              </CardHeader>
            </Card>
            <Card className="w-64">
              <CardHeader>
                <h4 className="font-semibold mb-2">Preprocessing</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• StandardScaler</li>
                  <li>• MinMaxScaler</li>
                  <li>• OneHotEncoder</li>
                </ul>
              </CardHeader>
            </Card>
          </div>
        </FadeSection>
      </main>
    </div>
  )
}
