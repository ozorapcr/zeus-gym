import { COLORS } from "../constants";
import ActivityTable from "../components/ActivityTable";
import Badge from "../components/Badge";
import BarChart from "../components/BarChart";
import Card from "../components/Card";
import ChartPanel from "../components/ChartPanel";
import Container from "../components/Container";
import DashboardHeader from "../components/DashboardHeader";
import DashboardShell from "../components/DashboardShell";
import Footer from "../components/Footer";
import IconRail from "../components/IconRail";
import LineChart from "../components/LineChart";
import MetricCard from "../components/MetricCard";
import MetricGrid from "../components/MetricGrid";
import MiniInfoCard from "../components/MiniInfoCard";
import ProgressRing from "../components/ProgressRing";
import QuickActionTile from "../components/QuickActionTile";
import SummaryGrid from "../components/SummaryGrid";
import SummaryTile from "../components/SummaryTile";
import WeatherWidget from "../components/WeatherWidget";
import { PageHeader, SectionTitle } from "../components/UI";

const dashboardComponents = [
  "DashboardShell",
  "DashboardHeader",
  "IconRail",
  "MetricCard",
  "MetricGrid",
  "ChartPanel",
  "BarChart",
  "LineChart",
  "SummaryTile",
  "SummaryGrid",
  "ActivityTable",
  "MiniInfoCard",
  "WeatherWidget",
  "QuickActionTile",
  "ProgressRing",
];

function DemoSection({ title, description, children }) {
  return (
    <Card style={{ marginBottom: 24 }}>
      <SectionTitle>{title}</SectionTitle>
      <p
        style={{
          color: COLORS.textSec,
          fontSize: 14,
          lineHeight: 1.7,
          margin: "0 0 20px",
          maxWidth: 760,
        }}
      >
        {description}
      </p>
      {children}
    </Card>
  );
}

export default function Components() {
  return (
    <Container>
      <PageHeader
        title="Components"
        subtitle="Total 15 component React yang dibreakdown dari dashboard pada gambar."
      />

      <DemoSection
        title="Preview Dashboard Gambar"
        description="Posisi preview dibuat paling atas. Semua bagian utama dashboard di bawah ini berasal dari 15 component terpisah."
      >
        <DashboardShell sidebar={<IconRail />} header={<DashboardHeader />}>
          <MetricGrid>
            <MetricCard value="10M" label="Sum of Sales" />
            <MetricCard value="5K" label="Sum of Profit" />
            <MetricCard value="600K" label="Sum of Shipping Cost" />
            <MetricCard value="70K" label="Sum of Quantity" />
          </MetricGrid>

          <div
            style={{
              display: "grid",
              gap: 20,
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              marginBottom: 20,
            }}
          >
            <ChartPanel title="Sales Chart">
              <BarChart data={[38, 70, 16, 86, 22, 41, 95, 77, 52, 84]} />
            </ChartPanel>
            <ChartPanel title="Monthly Load">
              <LineChart points={[42, 78, 18, 8, 34, 66, 70, 24, 28, 62, 39]} />
            </ChartPanel>
            <ChartPanel title="Activity Table">
              <ActivityTable />
            </ChartPanel>
          </div>

          <SummaryGrid>
            <SummaryTile value="52K" label="Sum of Profit Furniture" tone="dark" icon="Home" />
            <SummaryTile value="52K" label="Sum of Profit Office Supplies" tone="pink" icon="Box" />
            <SummaryTile value="32K" label="Sum of Profit Watch" tone="soft" icon="Tag" />
            <MiniInfoCard title="Today Visits" value="1,456,023" icon="Eye" />
            <WeatherWidget />
            <QuickActionTile label="Upload" icon="Upload" tone="pink" />
            <Card style={{ alignItems: "center", display: "flex", justifyContent: "center", padding: 16 }}>
              <ProgressRing value={65} />
            </Card>
          </SummaryGrid>
        </DashboardShell>
      </DemoSection>

      <Card style={{ marginBottom: 24 }}>
        <SectionTitle>15 File Component</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {dashboardComponents.map((component) => (
            <Badge key={component} type="secondary">
              {component}
            </Badge>
          ))}
        </div>
      </Card>

      <Footer />
    </Container>
  );
}
