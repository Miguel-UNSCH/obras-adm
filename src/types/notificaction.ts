export type NotificationStatus = 'pendiente' | 'en-progreso' | 'completado' | 'cancelado';

export interface Notification {
  id: string;
  title: string;
  description: string;
  status: NotificationStatus;
  priority: 'baja' | 'media' | 'alta';
  date: string;
}

