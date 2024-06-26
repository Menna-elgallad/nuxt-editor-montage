export interface Layer {
  id?: number;
  element: any;
  name: string;
  type: string;
  hidden: boolean;
  locked: boolean;
  opacity: number;
  timeToShow: number;
  timeToHide: number;
  width: number;
  startPosition: number;
  endPosition?: number;
}

export interface Slide {
  layers: Layer[];
  isActive: boolean;
  width: number;
  id: number;
  x1?: number;
  x2?: number;
}
