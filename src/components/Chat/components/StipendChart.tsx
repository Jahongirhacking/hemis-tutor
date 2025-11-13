import { Coins } from 'lucide-react';
import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ITable {
  monthOn: string;
  month: string;
  creditSum: number;
  creditStatusId: number;
  creditStatus: string;
}

interface IStipendType {
  stipendTypeId: number;
  stipendType: string;
  totalCreditSum: number;
  tables: ITable[];
}

interface StipendChartProps {
  stipendTypes: IStipendType[];
  height?: number;
}

const stipendNamesUz: Record<number, string> = {
  1: 'Bazaviy stipendiya',
  2: 'Nomli davlat stipendiyalari',
  3: 'Prezident granti stipendiyasi',
  4: 'Prezident davlat stipendiyasi',
  5: 'Adiblar nomidagi maxsus stipendiya',
  6: 'Doktorant (DSc) stipendiyasi',
  7: 'Tayanch doktorant (PhD) stipendiyasi',
  8: 'Stajyor-tadqiqotchi stipendiyasi',
  9: 'Davlat granti asosida o‘qiyotgan a’lochi talaba stipendiyasi',
  10: 'Boshqa stipendiyalar (maxsus hisob raqam)',
  11: 'Nogiron talabalar stipendiyasi',
  12: 'To‘liq davlat ta’minotidagi talaba bazaviy stipendiyasi',
  13: 'To‘lov-shartnoma asosida o‘qiyotgan a’lochi talaba uchun Jamg‘arma rag‘bat to‘lovi (BMS 20%)',
  14: 'YOI boshlang‘ich tashkiloti yetakchisi uchun qo‘shimcha haq (BMS 500%)',
  15: 'Bir martalik rag‘bat yoki moddiy yordam (BMS 1000% gacha)',
  16: 'Iqtidorli va ehtiyojmand talabalar uchun Jamg‘arma qo‘shimcha to‘lovi (BMS 50% gacha)',
  17: 'Boshqa rag‘batlantirishlar',
  18: 'Talaba qizlar uchun maxsus stipendiya (BMS 100%)',
  19: 'To‘liq davlat ta’minotidagi talabalar uchun Jamg‘arma stipendiyasi (BMS 50%)',
  20: 'Nogiron, davlat granti asosida o‘qiyotgan a’lochi talabalar stipendiyasi',
  21: 'ShHT, MDH va TDT a’zo davlatlar fuqarolari stipendiyasi',
  22: 'Klinik ordinatura talabalar stipendiyasi',
  23: 'Boshqa stipendiyalar (to‘lov-shartnoma)',
  24: 'Tibbiyot OTM talabalari uchun 100% ustama',
  25: 'Prezident davlat stipendiyasi (tayanch doktorantlar uchun)',
  26: 'Doktorant (DSc) stipendiyasi (to‘lov-shartnoma)',
  27: 'Tayanch doktorant (PhD) stipendiyasi (to‘lov-shartnoma)',
  28: 'Stajyor-tadqiqotchi stipendiyasi (to‘lov-shartnoma)',
  29: 'Maxsus stipendiya (BS 200%)',
};

const truncateText = (text: string, maxLength = 25) =>
  text?.length > maxLength ? text.slice(0, maxLength) + '…' : text;

const StipendChart: React.FC<StipendChartProps> = ({
  stipendTypes,
  height = 500,
}) => {
  // 🔍 Normalize and skip 0s
  const chartData = useMemo(() => {
    const allMonths = Array.from(
      new Set(stipendTypes.flatMap(s => s.tables.map(t => t.month)))
    );

    return allMonths.map(month => {
      const row: Record<string, any> = { month };
      stipendTypes.forEach(stip => {
        const found = stip.tables.find(t => t.month === month);
        const uzName = stipendNamesUz[stip.stipendTypeId] ?? 'Stipendiya';
        const sum = found?.creditSum ?? 0;
        if (sum > 0) row[uzName] = sum;
      });
      return row;
    });
  }, [stipendTypes]);

  // 🔹 Filter out empty months
  const filteredData = chartData.filter(
    row =>
      Object.keys(row).length > 1 &&
      Object.entries(row).some(([key, val]) => key !== 'month' && val > 0)
  );

  // ✅ Only include stipend types that appear at least once (no zero-only bars)
  const activeStipends = useMemo(() => {
    return stipendTypes
      .filter(stip =>
        filteredData.some(
          row => row[stipendNamesUz[stip.stipendTypeId] ?? 'Stipendiya'] > 0
        )
      )
      .map(stip => ({
        id: stip.stipendTypeId,
        name: stipendNamesUz[stip.stipendTypeId] ?? 'Stipendiya',
      }));
  }, [stipendTypes, filteredData]);

  const colors = [
    '#4F46E5',
    '#22C55E',
    '#EAB308',
    '#EF4444',
    '#0EA5E9',
    '#A855F7',
    '#14B8A6',
  ];

  const tooltipFormatter = (value: any, name: string) => {
    const num = Number(value) || 0;
    return [`${num.toLocaleString('uz-UZ')} so'm`, truncateText(name, 20)];
  };

  return (
    <div
      style={{
        width: '100%',
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#1f2937',
          marginBottom: 16,
        }}
      >
        <Coins /> Stipendiyalar bo‘yicha oylik to‘lovlar
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 650, height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
              barCategoryGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="month" width={120} />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              {activeStipends.map((stip, i) => (
                <Bar
                  key={stip.id}
                  dataKey={stip.name}
                  fill={colors[i % colors.length]}
                  barSize={20}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StipendChart;
