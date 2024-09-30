export type Leaderboard = {
    enabled: boolean;
  
    id: string;
    name: string;
  
    fetchData: () => Promise<any>;
    transformData?: (data: any[]) => any[];
};