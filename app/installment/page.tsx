'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import {
  Smartphone,
  Cpu,
  CreditCard,
  Wallet,
  Calendar,
  FileCheck,
  Phone,
  BadgeCheck,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Banknote,
} from 'lucide-react'

const benefits = [
  {
    title: 'اقساط تا ۲۴ ماه',
    icon: Calendar,
    description: 'امکان خرید با بازپرداخت بلندمدت',
  },
  {
    title: 'پاسخ سریع',
    icon: Clock3,
    description: 'بررسی درخواست در کوتاه‌ترین زمان',
  },
  {
    title: 'خرید موبایل و قطعات',
    icon: Smartphone,
    description: 'مناسب مشتریان و همکاران',
  },
  {
    title: 'قرارداد شفاف',
    icon: ShieldCheck,
    description: 'بدون هزینه‌های پنهان',
  },
]

const mobileConditions = [
  'حداقل پیش پرداخت ۳۰ درصد',
  'اقساط ۶ تا ۲۴ ماه',
  'چک صیادی الزامی',
  'امکان خرید تا سقف ۱۵۰ میلیون تومان',
]

const partsConditions = [
  'حداقل پیش پرداخت ۲۰ درصد',
  'اقساط ۳ تا ۱۲ ماه',
  'ویژه قطعات و لوازم جانبی',
  'امکان خرید تا سقف ۵۰ میلیون تومان',
]

const steps = [
  {
    title: 'ثبت درخواست',
    desc: 'فرم درخواست را تکمیل کنید.',
  },
  {
    title: 'بررسی مدارک',
    desc: 'مدارک شما توسط کارشناسان بررسی می‌شود.',
  },
  {
    title: 'تایید اعتبار',
    desc: 'پس از تایید با شما تماس گرفته می‌شود.',
  },
  {
    title: 'تحویل کالا',
    desc: 'کالا در سریع‌ترین زمان تحویل می‌شود.',
  },
]

export default function InstallmentPage() {
  const [price, setPrice] = useState(30000000)
  const [downPayment, setDownPayment] = useState(30)
  const [months, setMonths] = useState(12)

  const downAmount = useMemo(() => {
    return Math.floor((price * downPayment) / 100)
  }, [price, downPayment])

  const loanAmount = useMemo(() => {
    return price - downAmount
  }, [price, downAmount])

  const monthlyPayment = useMemo(() => {
    return Math.floor(loanAmount / months)
  }, [loanAmount, months])

  return (
    <div className="min-h-screen flex flex-col bg-background">

      <Navbar />

      <main className="flex-1">

        {/* Hero */}

        <section className="relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />

          <div className="relative max-w-7xl mx-auto px-4 py-24">

            <div className="max-w-3xl">

              <Badge className="mb-5 bg-primary text-white">
                شرایط ویژه خرید اقساطی
              </Badge>

              <h1 className="text-5xl font-black leading-tight text-foreground mb-6">

                خرید اقساطی
                <span className="text-primary block mt-2">
                  موبایل و قطعات موبایل
                </span>

              </h1>

              <p className="text-lg leading-8 text-muted-foreground mb-8">

                بدون نیاز به پرداخت کامل مبلغ کالا،
                موبایل، تبلت و قطعات مورد نیاز خود را با شرایط
                اقساطی ویژه خریداری کنید.

              </p>

              <div className="flex flex-wrap gap-4">

                <Button
                  className="bg-primary hover:bg-primary/90 h-12 px-8"
                >
                  ثبت درخواست
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>

                <Link href="/shop">
  <Button
    variant="outline"
    className="h-12 px-8"
  >
    مشاهده محصولات
  </Button>
</Link>

              </div>

            </div>

          </div>

        </section>

        {/* Benefits */}

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-4">

            <div className="text-center mb-14">

              <h2 className="text-3xl font-bold mb-3">
                چرا خرید اقساطی از ما؟
              </h2>

              <p className="text-muted-foreground">
                شرایطی ساده، شفاف و مناسب برای خرید انواع موبایل و قطعات
              </p>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

              {benefits.map((item, index) => {

                const Icon = item.icon

                return (

                  <Card
                    key={index}
                    className="rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >

                    <CardContent className="p-7">

                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">

                        <Icon className="w-7 h-7 text-primary" />

                      </div>

                      <h3 className="font-bold text-lg mb-3">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>

                    </CardContent>

                  </Card>

                )

              })}

            </div>

          </div>

        </section>

        <Separator />

        {/* Conditions */}

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-4">

            <div className="text-center mb-10">

              <h2 className="text-3xl font-bold">
                شرایط فروش اقساطی
              </h2>

            </div>

            <Tabs
              defaultValue="mobile"
              className="space-y-8"
            >

              <TabsList className="grid grid-cols-2 w-full">

                <TabsTrigger value="mobile">

                  <Smartphone className="w-4 h-4 ml-2" />

                  موبایل

                </TabsTrigger>

                <TabsTrigger value="parts">

                  <Cpu className="w-4 h-4 ml-2" />

                  قطعات

                </TabsTrigger>

              </TabsList>

              <TabsContent value="mobile">

                <Card className="rounded-2xl">

                  <CardContent className="p-8">

                    <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">

{mobileConditions.map((item, index) => (

  <div
    key={index}
    className="flex items-center gap-3"
  >
    <CheckCircle2 className="w-5 h-5 text-primary" />

    <span>{item}</span>

  </div>

))}

</div>

<div className="bg-muted rounded-2xl p-6">

<Smartphone className="w-14 h-14 text-primary mb-4" />

<h3 className="font-bold text-xl mb-3">
  خرید اقساطی موبایل
</h3>

<p className="text-muted-foreground leading-8">

  تمامی گوشی‌های موبایل موجود در فروشگاه
  با شرایط اقساطی قابل خرید هستند.
  پس از تایید مدارک، سفارش شما ثبت و
  ارسال خواهد شد.

</p>

</div>

</div>

</CardContent>

</Card>

</TabsContent>

<TabsContent value="parts">

<Card className="rounded-2xl">

<CardContent className="p-8">

<div className="grid md:grid-cols-2 gap-6">

<div className="space-y-4">

{partsConditions.map((item, index) => (

  <div
    key={index}
    className="flex items-center gap-3"
  >

    <CheckCircle2 className="w-5 h-5 text-primary" />

    <span>{item}</span>

  </div>

))}

</div>

<div className="bg-muted rounded-2xl p-6">

<Cpu className="w-14 h-14 text-primary mb-4" />

<h3 className="font-bold text-xl mb-3">

  خرید اقساطی قطعات

</h3>

<p className="text-muted-foreground leading-8">

  انواع LCD، باتری، فلت، برد،
  آی‌سی، ابزار تعمیرات و سایر
  قطعات نیز شامل شرایط اقساطی هستند.

</p>

</div>

</div>

</CardContent>

</Card>

</TabsContent>

</Tabs>

</div>

</section>

<Separator />

{/* Calculator */}

<section className="py-20">

<div className="max-w-7xl mx-auto px-4">

<div className="text-center mb-12">

<h2 className="text-3xl font-bold mb-3">

محاسبه تقریبی اقساط

</h2>

<p className="text-muted-foreground">

مبلغ کالا، درصد پیش پرداخت و تعداد اقساط را وارد کنید.

</p>

</div>

<div className="grid lg:grid-cols-2 gap-8">

<Card className="rounded-2xl">

<CardContent className="p-8 space-y-6">

<div>

<Label>

مبلغ کالا

</Label>

<Input
type="number"
value={price}
onChange={(e) =>
setPrice(Number(e.target.value))
}
/>

</div>

<div>

<Label>

درصد پیش پرداخت

</Label>

<Input
type="number"
value={downPayment}
onChange={(e) =>
setDownPayment(Number(e.target.value))
}
/>

</div>

<div>

<Label>

تعداد اقساط

</Label>

<Input
type="number"
value={months}
onChange={(e) =>
setMonths(Number(e.target.value))
}
/>

</div>

</CardContent>

</Card>

<Card className="rounded-2xl">

<CardContent className="p-8 space-y-5">

<div className="flex justify-between">

<span>پیش پرداخت</span>

<strong>

{new Intl.NumberFormat("fa-IR").format(downAmount)} تومان

</strong>

</div>

<Separator />

<div className="flex justify-between">

<span>مبلغ اقساط</span>

<strong>

{new Intl.NumberFormat("fa-IR").format(loanAmount)} تومان

</strong>

</div>

<Separator />

<div className="flex justify-between text-lg">

<span>قسط ماهانه</span>

<span className="text-primary font-bold">

{new Intl.NumberFormat("fa-IR").format(monthlyPayment)} تومان

</span>

</div>

</CardContent>

</Card>

</div>

</div>

</section>
        {/* Steps */}

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">
                مراحل دریافت خرید اقساطی
              </h2>

              <p className="text-muted-foreground">
                تنها در چهار مرحله ساده
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

              {steps.map((step, index) => (

                <Card
                  key={index}
                  className="rounded-2xl text-center"
                >

                  <CardContent className="p-8">

                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-5">

                      {index + 1}

                    </div>

                    <h3 className="font-bold mb-3">

                      {step.title}

                    </h3>

                    <p className="text-sm text-muted-foreground leading-7">

                      {step.desc}

                    </p>

                  </CardContent>

                </Card>

              ))}

            </div>

          </div>
        </section>

        {/* FAQ */}

        <section className="py-20">

          <div className="max-w-4xl mx-auto px-4">

            <div className="text-center mb-10">

              <h2 className="text-3xl font-bold">

                سوالات متداول

              </h2>

            </div>

            <Accordion
              type="single"
              collapsible
              className="w-full"
            >

              <AccordionItem value="1">

                <AccordionTrigger>

                  آیا ضامن لازم است؟

                </AccordionTrigger>

                <AccordionContent>

                  بسته به مبلغ خرید، ممکن است تنها چک صیادی کافی باشد.

                </AccordionContent>

              </AccordionItem>

              <AccordionItem value="2">

                <AccordionTrigger>

                  آیا امکان تسویه زودتر وجود دارد؟

                </AccordionTrigger>

                <AccordionContent>

                  بله، در هر زمان امکان تسویه کامل وجود دارد.

                </AccordionContent>

              </AccordionItem>

              <AccordionItem value="3">

                <AccordionTrigger>

                  چه کالاهایی شامل اقساط هستند؟

                </AccordionTrigger>

                <AccordionContent>

                  موبایل، تبلت، قطعات و لوازم جانبی.

                </AccordionContent>

              </AccordionItem>

            </Accordion>

          </div>

        </section>

        {/* CTA */}

        <section className="pb-24">

          <div className="max-w-5xl mx-auto px-4">

            <Card className="rounded-3xl bg-primary text-white border-0">

              <CardContent className="p-12 text-center">

                <Badge className="bg-white text-primary mb-5">

                  فروش اقساطی

                </Badge>

                <h2 className="text-4xl font-black mb-6">

                  آماده خرید هستید؟

                </h2>

                <p className="opacity-90 mb-8 leading-8">

                  همین حالا درخواست خرید اقساطی خود را ثبت کنید
                  تا کارشناسان ما در سریع‌ترین زمان با شما تماس بگیرند.

                </p>

                <div className="flex justify-center gap-4 flex-wrap">

                  <Button
                    size="lg"
                    variant="secondary"
                  >
                    ثبت درخواست
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:text-primary"
                  >

                    <Phone className="w-4 h-4 ml-2"/>

                    021-12345678

                  </Button>

                </div>

              </CardContent>

            </Card>

          </div>

        </section>

      </main>

      <Footer />

    </div>

  )

}