interface BaseType {
  name?: string;
  id?: number;
}

export interface ICharacter extends BaseType {
  image: string;
  location: BaseType;
  episode: BaseType[];
  species?: string;
  gender?: string;
}
