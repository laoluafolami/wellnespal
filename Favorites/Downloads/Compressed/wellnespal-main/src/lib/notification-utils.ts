// Browser notification utilities for health reminders

export interface NotificationOptions {
  title: string;
  message: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  sound?: boolean;
  vibrate?: boolean;
}

class NotificationManager {
  private static instance: NotificationManager;
  private permission: NotificationPermission = 'default';
  private audioContext: AudioContext | null = null;
  private isClient: boolean = false;

  private constructor() {
    // Only initialize on client side
    if (typeof window !== 'undefined') {
      this.isClient = true;
      this.checkPermission();
      this.initializeAudio();
    }
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  private checkPermission(): void {
    if (this.isClient && 'Notification' in window) {
      this.permission = Notification.permission;
    }
  }

  private initializeAudio(): void {
    if (!this.isClient) return;
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!this.isClient || !('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (this.permission === 'granted') {
      return true;
    }

    if (this.permission === 'denied') {
      return false;
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission === 'granted';
  }

  canSendNotifications(): boolean {
    return this.isClient && 'Notification' in window && this.permission === 'granted';
  }

  // Play notification sound
  private playNotificationSound(): void {
    if (!this.isClient || !this.audioContext) return;

    try {
      // Create a simple beep sound
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }

  // Vibrate phone (if supported)
  private vibratePhone(): void {
    if (this.isClient && 'vibrate' in navigator) {
      // Vibration pattern: vibrate for 200ms, pause 100ms, vibrate 200ms, pause 100ms, vibrate 200ms
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  }

  async sendNotification(options: NotificationOptions): Promise<Notification | null> {
    if (!this.canSendNotifications()) {
      console.warn('Cannot send notification: permission not granted');
      return null;
    }

    try {
      const notification = new Notification(options.title, {
        body: options.message,
        icon: options.icon || '/favicon.ico',
        badge: options.badge || '/favicon.ico',
        tag: options.tag,
        requireInteraction: options.requireInteraction || false,
      });

      // Add sound and vibration if requested
      if (options.sound) {
        this.playNotificationSound();
      }
      
      if (options.vibrate) {
        this.vibratePhone();
      }

      // Auto-close after 10 seconds if not requiring interaction
      if (!options.requireInteraction) {
        setTimeout(() => {
          notification.close();
        }, 10000);
      }

      return notification;
    } catch (error) {
      console.error('Failed to send notification:', error);
      return null;
    }
  }

  // Enhanced notification for medication reminders
  async sendMedicationReminder(medicationName: string, dosage: string): Promise<Notification | null> {
    return this.sendNotification({
      title: `💊 Time for ${medicationName}`,
      message: `Take ${dosage} of ${medicationName}`,
      tag: `medication-${medicationName}`,
      requireInteraction: true,
      sound: true,
      vibrate: true,
    });
  }

  async sendBPReminder(): Promise<Notification | null> {
    return this.sendNotification({
      title: '🩺 Blood Pressure Check',
      message: 'Time to take your blood pressure reading',
      tag: 'bp-reminder',
      requireInteraction: true,
      sound: true,
      vibrate: true,
    });
  }

  async sendGlucoseReminder(): Promise<Notification | null> {
    return this.sendNotification({
      title: '🩸 Glucose Check',
      message: 'Time to check your blood glucose level',
      tag: 'glucose-reminder',
      requireInteraction: true,
      sound: true,
      vibrate: true,
    });
  }

  async sendDailyHealthSummary(missedMedications: number, missedReadings: number): Promise<Notification | null> {
    if (missedMedications === 0 && missedReadings === 0) {
      return this.sendNotification({
        title: '🎉 Great Job!',
        message: 'You completed all your health tasks today!',
        tag: 'daily-summary',
        sound: false,
        vibrate: false,
      });
    }

    const message = `${missedMedications} missed medications, ${missedReadings} missed readings`;
    return this.sendNotification({
      title: '📊 Daily Health Summary',
      message,
      tag: 'daily-summary',
      sound: true,
      vibrate: true,
    });
  }

  // Keep screen awake during important reminders
  async requestWakeLock(): Promise<WakeLockSentinel | null> {
    if (this.isClient && 'wakeLock' in navigator) {
      try {
        const wakeLock = await (navigator as any).wakeLock.request('screen');
        return wakeLock;
      } catch (error) {
        console.warn('Wake lock not supported or failed:', error);
      }
    }
    return null;
  }
}

// Create instance only on client side
let notificationManagerInstance: NotificationManager | null = null;

export const getNotificationManager = (): NotificationManager => {
  if (typeof window === 'undefined') {
    // Return a mock object for server-side rendering
    return {
      requestPermission: async () => false,
      canSendNotifications: () => false,
      sendNotification: async () => null,
      sendMedicationReminder: async () => null,
      sendBPReminder: async () => null,
      sendGlucoseReminder: async () => null,
      sendDailyHealthSummary: async () => null,
      requestWakeLock: async () => null,
    } as any;
  }

  if (!notificationManagerInstance) {
    notificationManagerInstance = NotificationManager.getInstance();
  }
  return notificationManagerInstance;
};

// Utility functions for common notification patterns
export async function setupNotificationPermission(): Promise<boolean> {
  return getNotificationManager().requestPermission();
}

export function canSendNotifications(): boolean {
  return getNotificationManager().canSendNotifications();
}

// Schedule notification for specific time
export function scheduleNotification(
  options: NotificationOptions,
  scheduledTime: Date
): number | null {
  if (typeof window === 'undefined') return null;
  
  const now = new Date();
  const delay = scheduledTime.getTime() - now.getTime();

  if (delay <= 0) {
    // Time has passed, send immediately
    getNotificationManager().sendNotification(options);
    return null;
  }

  // Schedule for future
  return window.setTimeout(() => {
    getNotificationManager().sendNotification(options);
  }, delay);
}

// Format time for notifications
export function formatNotificationTime(date: Date): string {
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

// Check if it's a good time to send notifications (not too late/early)
export function isGoodTimeForNotification(date: Date = new Date()): boolean {
  const hour = date.getHours();
  return hour >= 6 && hour <= 22; // Between 6 AM and 10 PM
}