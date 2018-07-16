### Adding new components

<h4>Styles</h4>
<p>Style for new designs should be added to the appropriate folder in <code>src/assets/patterns/styles/</code>.</p>

<h4>JavaScript</h4>
<p>JS for new designs should be added to <code>src/assets/patterns/scripts/app.js</code>.</p>

<h4>HTML</h4>
<p>HTML for new designs should be added to the appropriate folder in <code>src/assets/patterns/materials/</code>.</p>
<p>When adding HTML the title of your new design element comes from the file title. So <code>new-element.html</code> will have a title of "New Element". You can also include notes about that element be presented in the toolkit as shown below:</p>
<pre class="language-HTML">

    ---
    notes: |
      - Add a note here
      - Each line should start with a Markdown bullet (either *, + or -).
    ---

    <div class="new-element-wrapper">
        <h2 class="new-element-title">Title</h2>
        <p>This is a new element.</p>
    </div>

</pre>
