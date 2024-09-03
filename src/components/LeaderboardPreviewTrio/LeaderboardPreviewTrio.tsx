import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import LeaderboardPreviewCard from "./LeaderboardPreviewCard";

/**
 * 
 * @param previewCardCount 0 < X < 3
 * @returns 
 */
export default function LeaderboardPreview(previewCardCount?: number) {
  // Can Render a solo card for players and a bigger card for crews, you can choose to render a series of three cards equivalent to the size of a solo crew card

  return (
    <div id="leaderboardPreview" className="flex gap-5 items-center">
      <LeaderboardPreviewCard type="R-SOLO" leaderboardPosition={1}/>
      <LeaderboardPreviewCard type="R-SOLO" leaderboardPosition={2} className="hidden md:flex"/>
      <LeaderboardPreviewCard type="R-SOLO" leaderboardPosition={3} className="hidden lg:flex"/>
    </div>
  )

}
  