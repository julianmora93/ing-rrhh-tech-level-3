export interface MenuEntity {
    Id: number;
    Name: string;
    Url?: string | null;
    IsSelected: boolean;
    Icon: string;
    Color: string;
    Children?: MenuEntity[] | null;
}