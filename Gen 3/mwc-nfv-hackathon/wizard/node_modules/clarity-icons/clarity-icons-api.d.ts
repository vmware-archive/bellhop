import { IconTemplate } from "./interfaces/icon-template";
import { IconAlias } from "./interfaces/icon-alias";
export declare class ClarityIconsApi {
    private static singleInstance;
    private constructor();
    static readonly instance: ClarityIconsApi;
    private validateName(name);
    private validateTemplate(template);
    private setIconTemplate(shapeName, shapeTemplate);
    private setIconAliases(templates, shapeName, aliasNames);
    add(icons?: IconTemplate): void;
    get(shapeName?: string): any;
    alias(aliases?: IconAlias): void;
}
