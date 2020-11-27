export interface Item{
    name: string;
    description: string;
    price: number;
    image: Array<string>;
    downloadLink: string;
    sha265Sum?: string;
}