interface Struct<T> {
  code?: number;
  message: string;
  info?: T;
}

export default class AppError<T extends object> implements Struct<T> {
  code?: number;
  message: string;
  info?: T;

  constructor(props: Struct<T>) {
    this.code = props.code || 400;
    this.message = props.message;
    if (props?.info) this.info = props.info;
  }
}
