import { LoaderUtils } from 'three';
import { validateBytes } from 'gltf-validator';
 import { ValidatorToggle } from './components/validator-toggle';
import { ValidatorReport } from './components/validator-report';

const SEVERITY_MAP = ['Errors', 'Warnings', 'Infos', 'Hints'];

export class Validator {

  /**
   * @param  {Element} el
   */
  constructor (el) {
    this.el = el;
    this.report = null;

    this.toggleEl = document.createElement('div');
    this.toggleEl.classList.add('report-toggle-wrap', 'hidden');
    this.el.appendChild(this.toggleEl);
  }

  validate (rootFile, rootPath, assetMap, response) {
    // TODO: This duplicates a request of the three.js loader, and could
    // take advantage of THREE.Cache after r90.
    return fetch(rootFile)
      .then((response) => response.arrayBuffer())
      .then((buffer) => validateBytes(new Uint8Array(buffer), {
        externalResourceFunction: (uri) =>
          this.resolveExternalResource(uri, rootFile, rootPath, assetMap)
      }))
      .then((report) => this.setReport(report, response))
      .catch((e) => console.log(e));
  }

  resolveExternalResource (uri, rootFile, rootPath, assetMap) {
    const baseURL = LoaderUtils.extractUrlBase(rootFile);
    const normalizedURL = rootPath + decodeURI(uri) // validator applies URI encoding.
      .replace(baseURL, '')
      .replace(/^(\.?\/)/, '');

    let objectURL;

    if (assetMap.has(normalizedURL)) {
      const object = assetMap.get(normalizedURL);
      objectURL = URL.createObjectURL(object);
    }

    return fetch(objectURL || (baseURL + uri))
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        if (objectURL) URL.revokeObjectURL(objectURL);
        return new Uint8Array(buffer);
      });
  }

  /**
   * @param {GLTFValidator.Report} report
   * @param {Object} response
   */
  setReport (report, response) {
    report.generator = report && report.info && report.info.generator || '';
    report.issues.maxSeverity = -1;
    SEVERITY_MAP.forEach((severity, index) => {
      if (report.issues[`num${severity}`] > 0 && report.issues.maxSeverity === -1) {
        report.issues.maxSeverity = index;
      }
    });
    report.errors = report.issues.messages.filter((msg) => msg.severity === 0);
    this.report = report;
    console.log(this.report)
    // this.setResponse(response);

  }

  /**
   * @param {Error} e
   */
  setReportException (e) {
    this.report = null;
    this.toggleEl.innerHTML = "";

  }

  showToggle () {
    this.toggleEl.classList.remove('hidden');
  }

  hideToggle () {
    this.toggleEl.classList.add('hidden');
  }

}

function escapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function linkify(text) {
  const urlPattern = /\b(?:https?):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
  const emailAddressPattern = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
  return text
    .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
    .replace(emailAddressPattern, '<a target="_blank" href="mailto:$1">$1</a>');
}
