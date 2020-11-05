export enum StatusType {
  None,
  Defined,
  Changing
}

export enum StatusValue {
  None,
  Enabled,
  Disabled,
  Waiting,
  Warning,
  Error,


  Active = Enabled,
  Paused = Warning,
  Suspended = Paused,
  Deactivated = Paused,
  Rescued = Waiting,
  Resized = Waiting,
  Stopped = Disabled,
  Terminated = Disabled,

  Undefined = Disabled,
  Pending = Waiting,
  Started = Waiting,
  Retry = Warning,
  Success = Enabled,
  Failed = Error,
  Completed = Disabled,

  Available = Enabled,

  Paid = Enabled,
  Cancelled = Disabled,
  Refunded = Disabled,
  Unpaid = Warning,
  Overdue = Error,
}

export interface IObjectStatus {
  type: StatusType;
  value: StatusValue;
}
