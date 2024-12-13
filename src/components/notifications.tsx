import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { Notification, NotificationStatus } from "@/types/notificaction"

const statusConfig: Record<NotificationStatus, { icon: React.ReactNode; color: string }> = {
    'pendiente': { icon: <Clock className="h-5 w-5" />, color: 'bg-yellow-100 text-yellow-800' },
    'en-progreso': { icon: <AlertCircle className="h-5 w-5" />, color: 'bg-blue-100 text-blue-800' },
    'completado': { icon: <CheckCircle className="h-5 w-5" />, color: 'bg-green-100 text-green-800' },
    'cancelado': { icon: <XCircle className="h-5 w-5" />, color: 'bg-red-100 text-red-800' },
}

const priorityColors = {
    'baja': 'bg-blue-100 text-blue-600',
    'media': 'bg-orange-100 text-orange-600',
    'alta': 'bg-red-100 text-red-800',
}

export function NotificationItem({ notification }: { notification: Notification }) {
    const { icon, color } = statusConfig[notification.status];

    return (
        <Card className="mb-4">
            <CardContent className="flex items-start p-4 max-h-32 overflow-hidden">
                <div className={`rounded-full p-2 mr-4 ${color}`}>
                    {icon}
                </div>
                <div className="flex-grow overflow-hidden">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-semibold" title={notification.title}>
                            {notification.title}
                        </h3>
                        <Badge className={priorityColors[notification.priority]}>
                            {notification.priority}
                        </Badge>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2" title={notification.description}>
                        {notification.description}
                    </p>
                    <p className="text-sm text-gray-500">{notification.date}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Notifications({ notifications }: { notifications: Notification[] }) {
    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
        </div>
    );
}
