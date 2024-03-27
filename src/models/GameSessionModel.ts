export type Player = {
    name: string;
    score: number;
  };
  
  export type GameSession = {
    gameId: string;
    players: Record<string, Player>;
    state: 'waiting' | 'active' | 'finished';
    teacherId: string;
    currentChallenge: any; // structure depends on the game
    teamAssignments?: Record<string, string>; // Optional: for assigning players to teams
  };
  