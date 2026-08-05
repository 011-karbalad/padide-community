'use client'

import { useState } from 'react'
import { Save, Store, Bell, CreditCard, Truck, Shield, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">تنظیمات</h1>
          <p className="text-sm text-muted-foreground mt-1">پیکربندی فروشگاه و سیستم</p>
        </div>
        <Button onClick={handleSave} size="sm" className="gap-2">
          <Save className="w-4 h-4" />
          {saved ? 'ذخیره شد' : 'ذخیره تغییرات'}
        </Button>
      </div>

      <Tabs defaultValue="store" dir="rtl">
        <TabsList className="flex-wrap h-auto gap-1 mb-6">
          <TabsTrigger value="store" className="gap-1.5"><Store className="w-3.5 h-3.5" />فروشگاه</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="w-3.5 h-3.5" />اعلان‌ها</TabsTrigger>
          <TabsTrigger value="payment" className="gap-1.5"><CreditCard className="w-3.5 h-3.5" />پرداخت</TabsTrigger>
          <TabsTrigger value="shipping" className="gap-1.5"><Truck className="w-3.5 h-3.5" />ارسال</TabsTrigger>
          <TabsTrigger value="seo" className="gap-1.5"><Globe className="w-3.5 h-3.5" />SEO</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5"><Shield className="w-3.5 h-3.5" />امنیت</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <h2 className="text-base font-semibold text-foreground">اطلاعات فروشگاه</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>نام فروشگاه</Label>
                <Input defaultValue="پدیده" />
              </div>
              <div className="space-y-1.5">
                <Label>شماره تماس</Label>
                <Input defaultValue="98-9361577733" dir="ltr" />
              </div>
              <div className="space-y-1.5">
                <Label>آدرس ایمیل</Label>
                <Input defaultValue="info@padideh.ir" dir="ltr" />
              </div>
              <div className="space-y-1.5">
                <Label>آدرس وبسایت</Label>
                <Input defaultValue="https://padideh.ir" dir="ltr" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>آدرس فروشگاه</Label>
              <Textarea defaultValue=" ارومیه فلکه خیام,رو به روی بانک پاسارگارد اموزشگاه پدیده" rows={2} />
            </div>
            <div className="space-y-1.5">
              <Label>توضیحات فروشگاه</Label>
              <Textarea defaultValue="بزرگترین فروشگاه آنلاین قطعات یدکی موبایل و تجهیزات تعمیر در ایران" rows={3} />
            </div>
            <Separator />
            <h2 className="text-base font-semibold text-foreground">تنظیمات عمومی</h2>
            {[
              { label: 'فروشگاه آنلاین', description: 'فروشگاه برای کاربران در دسترس باشد', defaultChecked: true },
              { label: 'ثبت‌نام مشتریان', description: 'اجازه ثبت‌نام مشتریان جدید', defaultChecked: true },
              { label: 'نمایش قیمت بدون ورود', description: 'کاربران بدون ورود قیمت‌ها را ببینند', defaultChecked: true },
              { label: 'سیستم نظردهی', description: 'مشتریان بتوانند نظر ثبت کنند', defaultChecked: true },
            ].map((s) => (
              <div key={s.label}>
                <SettingRow label={s.label} description={s.description}>
                  <Switch defaultChecked={s.defaultChecked} />
                </SettingRow>
                <Separator />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-1">
            <h2 className="text-base font-semibold text-foreground mb-4">تنظیمات اعلان‌ها</h2>
            {[
              { label: 'اعلان سفارش جدید', description: 'ایمیل برای هر سفارش جدید ارسال شود', checked: true },
              { label: 'اعلان پرداخت موفق', description: 'پیامک تأیید پرداخت به مشتری', checked: true },
              { label: 'اعلان کم بودن موجودی', description: 'هشدار هنگام کم شدن موجودی', checked: true },
              { label: 'اعلان تعمیر جدید', description: 'ایمیل برای درخواست تعمیر جدید', checked: true },
              { label: 'گزارش روزانه', description: 'ارسال خلاصه فروش روزانه به ایمیل', checked: false },
              { label: 'گزارش هفتگی', description: 'ارسال گزارش کامل هفتگی', checked: true },
            ].map((s, i) => (
              <div key={s.label}>
                <SettingRow label={s.label} description={s.description}>
                  <Switch defaultChecked={s.checked} />
                </SettingRow>
                {i < 5 && <Separator />}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <h2 className="text-base font-semibold text-foreground">درگاه‌های پرداخت</h2>
            {[
              { name: 'زرین‌پال', desc: 'درگاه پرداخت اینترنتی زرین‌پال', active: true },
              { name: 'ملت', desc: 'درگاه پرداخت بانک ملت', active: false },
              { name: 'پارسیان', desc: 'درگاه پرداخت بانک پارسیان', active: false },
            ].map((g, i) => (
              <div key={g.name}>
                <SettingRow label={g.name} description={g.desc}>
                  <Switch defaultChecked={g.active} />
                </SettingRow>
                {i < 2 && <Separator />}
              </div>
            ))}
            <Separator />
            <h2 className="text-base font-semibold text-foreground">خرید اقساطی</h2>
            {[
              { label: 'فعال‌سازی اقساط', description: 'امکان خرید اقساطی برای مشتریان', checked: true },
              { label: 'اقساط ۳ ماهه', description: 'تقسیم مبل به ۳ قسط مساوی', checked: true },
              { label: 'اقساط ۶ ماهه', description: 'تقسیم مبلغ به ۶ قسط مساوی', checked: true },
              { label: 'اقساط ۱۲ ماهه', description: 'تقسیم مبلغ به ۱۲ قسط مساوی', checked: false },
            ].map((s, i) => (
              <div key={s.label}>
                <SettingRow label={s.label} description={s.description}>
                  <Switch defaultChecked={s.checked} />
                </SettingRow>
                {i < 3 && <Separator />}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shipping">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <h2 className="text-base font-semibold text-foreground">روش‌های ارسال</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>حداقل سفارش ارسال رایگان (تومان)</Label>
                <Input defaultValue="500000" dir="ltr" />
              </div>
              <div className="space-y-1.5">
                <Label>هزینه پایه ارسال (تومان)</Label>
                <Input defaultValue="25000" dir="ltr" />
              </div>
            </div>
            {[
              { label: 'پست پیشتاز', description: 'ارسال از طریق پست پیشتاز (۲-۳ روز کاری)', checked: true },
              { label: 'پیک موتوری', description: 'تحویل همان روز در تهران', checked: true },
              { label: 'پیک فوری', description: 'ارسال اکسپرس ۴ ساعته (تهران)', checked: false },
              { label: 'ارسال رایگان بالای سقف', description: 'ارسال رایگان برای سفارش‌های بالا', checked: true },
            ].map((s, i) => (
              <div key={s.label}>
                <SettingRow label={s.label} description={s.description}>
                  <Switch defaultChecked={s.checked} />
                </SettingRow>
                {i < 3 && <Separator />}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="seo">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-foreground">تنظیمات SEO</h2>
            <div className="space-y-1.5">
              <Label>عنوان پیش‌فرض سایت</Label>
              <Input defaultValue="پدیده | قطعات موبایل و تعمیرات" />
            </div>
            <div className="space-y-1.5">
              <Label>توضیحات متا</Label>
              <Textarea defaultValue="بزرگترین فروشگاه آنلاین قطعات یدکی موبایل، تجهیزات تعمیر و ابزار تخصصی. خرید اقساطی، ضمانت اصالت کالا، ارسال سریع." rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label>کلمات کلیدی</Label>
              <Input defaultValue="قطعات موبایل, تعمیر موبایل, LCD موبایل, باتری موبایل" />
            </div>
            <Separator />
            {[
              { label: 'Sitemap خودکار', description: 'تولید خودکار نقشه سایت', checked: true },
              { label: 'Schema.org', description: 'اضافه کردن داده‌های ساختاریافته به محصولات', checked: true },
            ].map((s, i) => (
              <div key={s.label}>
                <SettingRow label={s.label} description={s.description}>
                  <Switch defaultChecked={s.checked} />
                </SettingRow>
                {i < 1 && <Separator />}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-1">
            <h2 className="text-base font-semibold text-foreground mb-4">تنظیمات امنیتی</h2>
            {[
              { label: 'احراز هویت دو مرحله‌ای', description: 'برای ورود به پنل مدیریت', checked: false },
              { label: 'ثبت رویدادها (Audit Log)', description: 'ذخیره تمام تغییرات سیستم', checked: true },
              { label: 'محدودیت IP ادمین', description: 'فقط IPهای مشخص به پنل دسترسی دارند', checked: false },
              { label: 'رمزنگاری داده‌های حساس', description: 'رمزنگاری اطلاعات بانکی مشتریان', checked: true },
              { label: 'کپچا در فرم‌ها', description: 'محافظت از فرم‌ها در برابر ربات‌ها', checked: true },
            ].map((s, i) => (
              <div key={s.label}>
                <SettingRow label={s.label} description={s.description}>
                  <Switch defaultChecked={s.checked} />
                </SettingRow>
                {i < 4 && <Separator />}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
