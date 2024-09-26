import * as admin from 'firebase-admin';
export class Notification {
  public async sendNotification(
    title: string,
    body: string,
    topic: string,
  ): Promise<void> {
    const notification = {
      title: title,
      body: body,
    };
    admin
      .app()
      .messaging()
      .send({
        topic: topic,
        notification: notification,
        data: {
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
          body: notification.body,
          title: notification.title,
        },
      });
  }

  public async createTopicForUser(token: string, topic: string): Promise<void> {
    try {
      await admin.app().messaging().subscribeToTopic(token, topic);
    } catch (error) {
      console.log('[createTopicForUser]- error al crear el topico', error);
    }
  }
}
