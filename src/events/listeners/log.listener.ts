import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerClientServicesTrx } from '../../shared/logger/logger.client';
import { LogEvents } from '../enums/log-events.enum';
import { ConfigurationLoggerTrx } from '../../shared/logger/logger.format';

@Injectable()
export class LogEventsListener {
    constructor(
        private readonly loggerServiceFirebase: LoggerClientServicesTrx,
    ) { }

    @OnEvent(LogEvents.ERROR)
    async handleError(payload: ConfigurationLoggerTrx) {
        Logger.debug(`Event: ${JSON.stringify(payload)}`, LogEventsListener.name);
        await this.loggerServiceFirebase.log(payload);
    }

    @OnEvent(LogEvents.INFO)
    async handleInfo(payload: ConfigurationLoggerTrx) {
        Logger.debug(`Event: ${JSON.stringify(payload)}`, LogEventsListener.name);
    }

    @OnEvent(LogEvents.INFO)
    async handleCreated(payload: ConfigurationLoggerTrx) {
        Logger.debug(`Event: ${JSON.stringify(payload)}`, LogEventsListener.name)
        //  const userFound = await this.userService.findByID(payload.author)
        //Logger.debug(`User found: ${JSON.stringify(userFound)}`, PostEventsListener.name)
        //await this.mailService.sendCommentToPostEmail(userFound.email, payload.authorName, payload.content)
    }

    @OnEvent(LogEvents.UPDATED)
    async handleUpdated(payload: ConfigurationLoggerTrx) {
        Logger.debug(`Event: ${JSON.stringify(payload)}`, LogEventsListener.name)
        //    const userFound = await this.userService.findByID(payload.author)
        //  Logger.debug(`User found: ${JSON.stringify(userFound)}`, PostEventsListener.name)
        // send email to user
        //  if (userFound) {
        //    await this.mailService.sendPostCreatedEmail(userFound.email, payload.authorName)
        // }
    }

    @OnEvent(LogEvents.DELETED)
    async handleDeleted(payload: ConfigurationLoggerTrx) {
        Logger.debug(`Event: ${JSON.stringify(payload)}`, LogEventsListener.name);
    }
}
