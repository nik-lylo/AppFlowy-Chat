import { useCallback, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./i18n";
import { useTranslation } from "react-i18next";

const languages = ["en"];

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<string>("en");
  const handleSwitchTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);
  const { t } = useTranslation() as { t: (key: string) => string };

  return (
    <div
      className={
        "border text-foreground bg-background flex flex-col items-center gap-4 p-10 my-20 rounded-[16px] max-w-[869px] w-full m-auto"
      }
    >
      <div className={"flex gap-4 items-center"}>
        <h1 className={"text-2xl"}>Editor Demo</h1>
        <div className={"flex gap-2 items-center"}>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={handleSwitchTheme}
          />
          <Label>{t("themeLabel")}</Label>
        </div>

        <Select onValueChange={setLang}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("languageLabel")} />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {lang}
      </div>
      <div className={"h-[500px] w-full"}></div>
    </div>
  );
}
