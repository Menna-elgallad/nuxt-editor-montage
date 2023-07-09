export interface Layer {
  element: any;
  name: string;
  type: string;
  hidden: boolean;
  locked: boolean;
  opacity: number;
  timeToShow: number;
  timeToHide: number;
}

export interface Slide {
  layers: Layer[];
  isActive: boolean;
  length: number;
  id: number;
}