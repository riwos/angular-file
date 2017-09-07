export const string = "<h3 id=\"module-usage\">Module Usage</h3>"+
"\n<pre><code class=\"lang-typescript\">import { NgModule } from &#39;@angular/core&#39;;"+
"\nimport { ngfModule } from &quot;angular-file&quot;;"+
"\n"+
"\n@NgModule({imports: [ ngfModule ]})"+
"\nexport class AppModule {}"+
"\n</code></pre>"+
"\n<h3 id=\"annotations\">Annotations</h3>"+
"\n<pre><code class=\"lang-typescript\">@Directive({ selector: &#39;[ngf]&#39; })"+
"\n@Directive({ selector: &#39;[ngfSelect]&#39; })"+
"\n@Directive({ selector: &#39;[ngfDrop]&#39; })"+
"\n</code></pre>"+
"\n<h2 id=\"fileuploader-api\">FileUploader API</h2>"+
"\n<pre><code class=\"lang-typescript\">import { FileUploader } from &quot;angular-file&quot;;"+
"\n</code></pre>"+
"\n<h3 id=\"properties\">Properties</h3>"+
"\n<ul>"+
"\n<li><code>url</code> - URL of File Uploader&#39;s route</li>"+
"\n<li><code>authToken</code> - auth token that will be applied as &#39;Authorization&#39; header during file send.</li>"+
"\n<li><code>disableMultipart</code> - If &#39;true&#39;, disable using a multipart form for file upload and instead stream the file. Some APIs (e.g. Amazon S3) may expect the file to be streamed rather than sent via a form. Defaults to false.</li>"+
"\n</ul>"+
"\n"