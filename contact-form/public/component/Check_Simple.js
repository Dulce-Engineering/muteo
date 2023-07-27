import Utils from "./Utils.js";

class Check_Simple extends HTMLElement
{
  static tname = "check-simple";
    
  constructor()
  {
    super();
    Utils.Bind(this, "On_");
  }

  connectedCallback()
  {
    this.Render();
  }

  // public fields ================================================================================

  get value()
  {
    return this?.box_input?.value;
  }

  get checked()
  {
    return this?.box_input?.checked;
  }

  // events =======================================================================================

  // rendering ====================================================================================

  Render_Input()
  {
    const name_attr = this.hasAttribute("has-name") ? `name="${this.getAttribute("has-name")}"` : "";
    const value_attr = this.hasAttribute("value") ? `value="${this.getAttribute("value")}"` : "";
    const required_attr = this.hasAttribute("is-required") ? "required" : "";

    const html = `<input cid="box_input" type="checkbox" ${name_attr} ${required_attr} ${value_attr}/>`;
    return html;
  }

  Render_Checkbox()
  {
    return `<div class="checkbox" tabindex="0"></div>`
  }

  Render_Label()
  {
    return `<slot name="label"></slot>`;
  }

  Render()
  {
    const html = `
      <label>
        ${this.Render_Input()}
        ${this.Render_Checkbox()}
        ${this.Render_Label()}
      </label>
    `;

    const doc = Utils.toDocument(html, this);
    this.replaceChildren(doc);
    Utils.Set_Id_Shortcuts(this, this, "cid");
  }
}

Utils.Register_Element(Check_Simple);

export default Check_Simple;
