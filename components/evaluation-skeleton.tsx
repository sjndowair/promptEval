"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function EvaluationSkeleton() {
  const evaluationItems = [
    { label: "명확성 (30%)", delay: 0 },
    { label: "구체성 (25%)", delay: 0.1 },
    { label: "맥락 제공 (20%)", delay: 0.2 },
    { label: "구조 (15%)", delay: 0.3 },
    { label: "간결성 (10%)", delay: 0.4 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600 dark:text-blue-400">
            <Skeleton className="h-6 w-40" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-24" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {evaluationItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: item.delay }}
              >
                <div className="flex justify-between mb-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                  <motion.div
                    className="h-2.5 rounded-full bg-gradient-to-r from-purple-300 to-purple-200 dark:from-blue-300 dark:to-blue-200"
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1, delay: item.delay + 0.2 }}
                  />
                </div>
                <Skeleton className="h-3 w-full mt-1" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md"
          >
            <Skeleton className="h-4 w-20 mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </motion.div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </motion.div>
  )
}
