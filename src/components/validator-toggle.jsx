import vhtml from 'vhtml';

/** @jsx vhtml */

export function ValidatorToggle ({issues, reportError}) {
  let levelClassName = '';
  let message = '';

  if (issues) {
    if (issues.numErrors) {
      message = `${issues.numErrors} errors.`;
    } else {
      message = 'Model details';
    }
    levelClassName = `level-${issues.maxSeverity}`;
  } else if (reportError) {
    message = `Validation could not run: ${reportError}.`;
  } else {
    message = 'Validation could not run.';
  }

  return (
    <div className={`report-toggle ${levelClassName}`}>
      <div class="report-toggle-text">{message}</div>
      <div class="report-toggle-close" aria-label="Hide">&times;</div>
    </div>
  );
};
