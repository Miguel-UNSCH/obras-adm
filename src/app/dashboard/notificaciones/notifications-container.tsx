import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

interface Notification {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    update: string;
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    'pendiente': { icon: <Clock className="h-5 w-5" />, color: 'bg-yellow-100 text-yellow-800' },
    'retirado': { icon: <AlertCircle className="h-5 w-5" />, color: 'bg-blue-100 text-blue-800' },
    'actualizado': { icon: <CheckCircle className="h-5 w-5" />, color: 'bg-green-100 text-green-800' },
    'eliminado': { icon: <XCircle className="h-5 w-5" />, color: 'bg-red-100 text-red-800' },
}

const priorityColors: Record<string, string> = {
    'baja': 'bg-blue-100 text-blue-600',
    'media': 'bg-orange-100 text-orange-600',
    'alta': 'bg-red-100 text-red-800',
}

export function NotificationItem({ notification }: { notification: Notification }) {
    const { icon, color } = statusConfig[notification.status] || { icon: null, color: '' };
    
    return (
        <Card className="mb-4">
            <CardContent className="flex items-center p-4 max-h-32 overflow-hidden">
                <div className={`rounded-full p-2 mr-4 ${color}`}>
                    {icon}
                </div>
                <div className="flex-grow overflow-hidden">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-xs font-semibold text-center sm:text-xl" title={notification.title}>
                            {notification.title}
                        </p>
                        <Badge className={priorityColors[notification.priority] || ''}>
                            {notification.priority}
                        </Badge>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2 text-left text-xs sm:text-sm" title={notification.description}>
                        {notification.description}
                    </p>
                    <p className="text-sm text-gray-500">{notification.update}</p>
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
