import Utils from "./Utils.js";

class Input_Area extends HTMLElement
{
  static tname = "input-area";
    
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

  // events =======================================================================================

  On_Change()
  {
    const length = this.box_input.value.length;
    this.length_elem.innerText = length;

    if (this.max_length && length >= this.max_length)
    {
      this.classList.add("at-max");
    }
    else
    {
      this.classList.remove("at-max");
    }
  }

  On_Mouse_Down(event)
  {
    const input_rect = this.box_input.getBoundingClientRect();
    this.input_top = input_rect.top;
    this.offset_y = event.clientY - input_rect.bottom;

    event.preventDefault();
    event.stopPropagation();

    window.addEventListener("mousemove", this.On_Mouse_Move);
    window.addEventListener("mouseup", this.On_Mouse_Up);
  }

  On_Mouse_Up()
  {
    window.removeEventListener("mousemove", this.On_Mouse_Move);
    window.removeEventListener("mouseup", this.On_Mouse_Up);
  }

  On_Mouse_Move(event)
  {
    const h = event.clientY - this.offset_y - this.input_top;
    this.box_input.style.height = h + "px";
  }

  // rendering ====================================================================================

  Render_Resizer()
  {
    return `
      <img cid="resizer" src="./image/icon-drag.svg">
    `;
  }

  Render_Length()
  {
    let html = "";

    if (this.hasAttribute("maxlength"))
    {
      let length_str = this.getAttribute("maxlength");
      this.max_length = parseInt(length_str);

      html  = `
        <div class="length-label">
          <span class="curr-length" cid="length_elem">0</span> /
          <span class="max-length">${length_str}</span>
        </div>
      `;
    }

    return html;
  }

  Render_Input()
  {
    const placeholder_attr = this.hasAttribute("placeholder") ? `placeholder="${this.getAttribute("placeholder")}"` : "";
    const name_attr = this.hasAttribute("has-name") ? `name="${this.getAttribute("has-name")}"` : "";
    const max_attr = this.hasAttribute("maxlength") ? `maxlength="${this.getAttribute("maxlength")}"` : "";

    const html = `<textarea cid="box_input" ${name_attr} ${placeholder_attr} ${max_attr}></textarea>`;
    return html;
  }

  Render()
  {
    this.innerHTML = `
      ${this.Render_Input()}
      ${this.Render_Length()}
      ${this.Render_Resizer()}
    `;

    Utils.Set_Id_Shortcuts(this, this, "cid");

    this.box_input.addEventListener("input", this.On_Change);
    this.resizer.addEventListener("mousedown", this.On_Mouse_Down);
  }
}

Utils.Register_Element(Input_Area);

export default Input_Area;
