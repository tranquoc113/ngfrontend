import * as _moment from 'moment';

export class TicketsUtilsService {
  public formatLastReply = function formatLastReply(lastReply) {
    const currentTime = new Date();
    const lastReplyTime = new Date(lastReply);
    // @ts-ignore
    const diff = currentTime - lastReplyTime;
    return _moment.duration(diff).humanize();
  }
}

