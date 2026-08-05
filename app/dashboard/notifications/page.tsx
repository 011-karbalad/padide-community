'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Bell, Package, Wrench, TrendingUp, Wallet, AlertCircle,
  CheckCheck, Trash2
} from 'lucide-react'
import { mockNotifications } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Notification } from '@/lib/types'

const typeIcons = {
  order: Package,
  repair: Wrench,
  promotion: TrendingUp,
  payment: Wallet,
  system: AlertCircle,
}

const typeColors = {
  order: 'text-primary bg-primary/10',
  repair: 'text-purple-600 bg-purple-100 dark:bg-purple-950/30',
  promotion: 'text-amber-600 bg-amber-100 dark:bg-amber-950/30',
  payment: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/30',
  system: 'text-muted-foreground bg-muted',
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            اعلان‌ها
            {unread > 0 && (
              <Badge className="bg-destructive text-white text-xs">
                {new Intl.NumberFormat('fa-IR').format(unread)} جدید
              </Badge>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{new Intl.NumberFormat('fa-IR').format(notifications.length)} اعلان</p>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs" onClick={markAllRead}>
            <CheckCheck className="w-3.5 h-3.5" />
            خواندن همه
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">اعلانی وجود ندارد</h3>
          <p className="text-sm text-muted-foreground">اعلان‌های جدید اینجا نمایش داده می‌شوند</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((notif) => {
            const Icon = typeIcons[notif.type] || Bell
            const colorClass = typeColors[notif.type]
            return (
              <div
                key={notif.id}
                className={cn(
                  'bg-card border rounded-2xl p-4 flex items-start gap-4 group transition-all',
                  !notif.read ? 'border-primary/25 bg-primary/[0.02]' : 'border-border'
                )}
                onClick={() => !notif.read && markRead(notif.id)}
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', colorClass)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn('text-sm font-medium', !notif.read ? 'text-foreground' : 'text-muted-foreground')}>
                      {notif.title}
                    </p>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{notif.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">{notif.message}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-primary" />}
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id) }}
                    className="w-7 h-7 rounded-lg hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
