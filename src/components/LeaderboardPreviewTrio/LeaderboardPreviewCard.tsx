import { Badge, ChevronRight, Link } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
export default function LeaderboardPreviewCard({type, leaderboardPosition, className}: {type: "R-SOLO" | "R-TEAM" | "CREW", leaderboardPosition: number, className?: string}) {
    let title = ""; 


    switch(type) {
        case "CREW":
            title = "Top Crew"
            break;
        case "R-SOLO":
            title = "Top Solo-Ranked"
            break;
        case "R-TEAM":
            title = "Top Team-Ranked"
            break;
    }
        
    
    const topPlayer = {
        rank: 1,
        name: "Detailed",
        affiliation: "Top Solo Ranked",
        score: "Diamond 2",
        avatar: "/placeholder.svg?height=120&width=120",
      }

    return(
        // <div className="w-[146px] bg-white rounded h-[212px]">
        //     <div id="leaderboardPreviewPosition" className="bg-[#c39b55] w-10 h-7 rounded">{leaderboardPosition}</div>
        //     <h1>{title}</h1>
        // </div>

      //   <CardContainer className={cn("overflow-hidden bg-gradient-to-br from-blue-900 to-blue-950 text-white shadow-xl w-48 h-56 rounded", className)} containerClassName="p-0 m-0">
      //       <CardBody className="w-auto h-auto">
      //       <div className="relative mb-6 flex justify-center">
      //     <img
      //       src={topPlayer.avatar}
      //       alt=""
      //       className="h-16 w-16 rounded-full border-4 border-blue-400 object-cover shadow-lg"
      //     />
      //     <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform bg-blue-500 px-3 py-1 text-lg font-bold">
      //       #{topPlayer.rank}
      //     </Badge>
      //   </div>
      //   <div className="space-y-2 text-center">
      //     <h3 className="text-2xl font-bold leading-tight">{topPlayer.name}</h3>
      //     <p className="text-sm text-blue-300">{topPlayer.affiliation}</p>
      //     <div className="flex items-baseline justify-center space-x-2">
      //       <span className="text-3xl font-bold text-blue-400">{topPlayer.score}</span>
      //     </div>
      //   </div>
      //   <div className="border-t border-blue-800 bg-blue-900/50 p-4">
      //   <Link href="/full-leaderboard">
      //     <Button variant="ghost" className="w-full justify-between text-blue-100 hover:bg-blue-800 hover:text-white">
      //       View Full Leaderboard
      //       <ChevronRight className="h-4 w-4" />
      //     </Button>
      //   </Link>
      // </div>
      //       </CardBody>
      //   </CardContainer>

      // <CardContainer className="bg-[#ededf1] w-48 h-56 rounded" containerClassName="p-0 m-0">
      //   <CardBody className="w-auto h-auto">

      //   </CardBody>
      // </CardContainer>
      <></>
    )
}