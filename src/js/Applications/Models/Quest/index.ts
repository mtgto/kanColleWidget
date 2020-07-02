import { Model, Types } from "chomex";
import { Group, Status, Category, Condition } from "./consts";
import catalog from "./catalog";

export class Quest extends Model {

  // chomex.Model.Types.reference.eagerを使わないのでたぶんこれはいらない
  static __ns = "Quest";

  static schema = {
    id: Types.number,
    title: Types.string,
    group: Types.string,
    status: Types.string,
    category: Types.string,
    requires: Types.arrayOf(Types.number),
    condition: Types.string,
  }
  id: number;
  title: string;
  group: Group;
  status: Status;
  category: Category;
  requires: number[];
  condition?: Condition;

  get completed(): boolean {
    return this.status == Status.Completed;
  }
}

export class QuestProgress extends Model {

  static __ns = "QuestProgress";
  static ukey = "user"; // 1モデル1エンティティなので

  static schema = {
    quests: Types.dictOf(Types.reference(Quest)),
    lastRefreshed: Types.date,
  }
  quests: { [id: number]: Quest };
  lastRefreshed: Date;

  /**
   * カタログからQuestのdictを生成して返す.
   * デフォルトではすべてのGroupのエントリを返す.
   * @param {Group[]} groups
   * @returns {[id:number]: Quest}
   */
  private static construct(
    groups: Group[] = [Group.Daily, Group.Weekly, Group.Monthly, Group.Quarterly, Group.Yearly]
  ): { [id: number]: Quest } {
    return Object.entries(catalog).reduce((ctx, [id, entry]) => {
      if (groups.includes(entry.group)) ctx[id] = Quest.new(entry);
      return ctx;
    }, {});
  }

  /**
   * 唯一Storageにストアされてるものを返す.
   */
  static user(): QuestProgress {
    return this.find(this.ukey) || this.new({ _id: this.ukey, quests: this.construct(), lastRefreshed: new Date() });
  }

  start(id: number): QuestProgress {
    this.quests[id].status = Status.Ongoing;
    return this.update({ quests: { ...this.quests } });
  }
  stop(id: number): QuestProgress {
    this.quests[id].status = Status.Open;
    return this.update({ quests: { ...this.quests } });
  }
  complete(id: number): QuestProgress {
    this.quests[id].status = Status.Completed;
    const quests = Object.values(this.quests).reduce((ctx, q) => {
      if (q.id == id) { ctx[q.id] = q; return ctx; }
      if (!q.requires || q.requires.length == 0) { ctx[q.id] = q; return ctx; }
      if (!q.requires.includes(id)) { ctx[q.id] = q; return ctx; }
      if (q.requires.every(x => this.quests[x].completed)) q.status = Status.Open;
      ctx[q.id] = q;
      return ctx;
    }, {});
    return this.update({ quests });
  }

  /**
   * TODO: これをいつどういうタイミングで呼ぶべきか
   * user() でやるべきかもなあ
   */
  shouldRefresh(now: Date = new Date()): Group[] {
    const groups = [];
    if (this.lastRefreshed.getKCDate() != now.getKCDate()) groups.push(Group.Daily);
    return groups;
  }
  refresh(groups: Group[] = [Group.Daily]): QuestProgress {
    const quests = QuestProgress.construct(groups);
    return this.update({ quests: { ...this.quests, ...quests }, lastRefreshed: new Date() });
  }

  /**
   * 指定されたカテゴリにおいて着手可能未着手のQuestリストを返す.
   * @param {Category} category
   */
  availables(category: Category): Quest[] {
    return Object.values(this.quests).filter(q => q.category == category && q.status == Status.Open);
  }

}
